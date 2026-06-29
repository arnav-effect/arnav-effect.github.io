import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDL1sp0DsyCFBA4lXSssT5tcSGWZTomTXw",
  authDomain: "arnav-effect.firebaseapp.com",
  projectId: "arnav-effect",
  storageBucket: "arnav-effect.firebasestorage.app",
  messagingSenderId: "1075969222399",
  appId: "1:1075961222399:web:924f0abee5682bd7938eca",
  measurementId: "G-FEJPE65PB0"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const DOWNLOAD_PAGE = './download.html';
const FORM_ID = 'magnetForm';
const SUCCESS_ID = 'successMsg';
const ERROR_ID = 'errorMsg';

const form = document.getElementById(FORM_ID);
const successEl = document.getElementById(SUCCESS_ID);
const errorEl = document.getElementById(ERROR_ID);
const submitBtn = form.querySelector('button[type="submit"]');
let isSubmitting = false;

function normalize(value) {
  return String(value || '').trim().replace(/\s+/g, ' ');
}

function isValidName(value) {
  const trimmed = normalize(value);
  return trimmed.length >= 2 && trimmed.length <= 80 && /^[A-Za-zÀ-ÖØ-öø-ÿ0-9 .,'\-]+$/.test(trimmed);
}

function isValidPhone(value) {
  const trimmed = normalize(value);
  return trimmed.length >= 7 && trimmed.length <= 24 && /^[0-9()+\- ]+$/.test(trimmed);
}

function isValidEmail(value) {
  const email = String(value || '').trim();
  return email.length >= 6 && email.length <= 100 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function setStatus(message, type) {
  if (type === 'success') {
    successEl.textContent = message;
    successEl.style.display = 'block';
    errorEl.style.display = 'none';
  } else {
    errorEl.textContent = message;
    errorEl.style.display = 'block';
    successEl.style.display = 'none';
  }
}

function clearStatus() {
  errorEl.style.display = 'none';
  successEl.style.display = 'none';
}

function setSubmitLocked(value) {
  isSubmitting = value;
  if (submitBtn) {
    submitBtn.disabled = value;
  }
}

function buildPayload() {
  return {
    name: normalize(form.name.value),
    phone: normalize(form.phone.value),
    email: String(form.email.value || '').trim().toLowerCase(),
    timestamp: serverTimestamp()
  };
}

function createAccessToken() {
  const token = Array.from(window.crypto.getRandomValues(new Uint32Array(6)))
    .map((value) => value.toString(36))
    .join('');

  return JSON.stringify({
    token,
    issuedAt: Date.now(),
    expiresAt: Date.now() + 5 * 60 * 1000
  });
}

function blockDirectSubmit(element) {
  if (!element || !element.submit) {
    return;
  }

  try {
    Object.defineProperty(element, 'submit', {
      value() {
        console.warn('Direct form.submit() calls are blocked for security reasons.');
      },
      writable: false
    });
  } catch (error) {
    // Some browsers do not allow redefining submit; ignore.
  }
}

function isSubmissionTriggerValid(event) {
  const submitter = event.submitter || document.activeElement;
  return submitter === submitBtn && event.isTrusted;
}

async function handleSubmit(event) {
  event.preventDefault();

  if (isSubmitting) {
    return;
  }

  if (!isSubmissionTriggerValid(event)) {
    setStatus('Please submit the form by clicking the button on the page.', 'error');
    return;
  }

  clearStatus();
  const rawName = form.name.value;
  const rawPhone = form.phone.value;
  const rawEmail = form.email.value;

  if (!isValidName(rawName)) {
    setStatus('Please enter a valid name (letters, numbers, space, . , \' and - are allowed).', 'error');
    return;
  }

  if (!isValidPhone(rawPhone)) {
    setStatus('Please enter a valid phone number using digits, spaces, +, ( ), and - only.', 'error');
    return;
  }

  if (!isValidEmail(rawEmail)) {
    setStatus('Please enter a valid email address.', 'error');
    return;
  }

  setSubmitLocked(true);

  try {
    await addDoc(collection(db, 'magnet1'), buildPayload());
    sessionStorage.setItem('magnetAccess', createAccessToken());
    setStatus('Redirecting to your guide…', 'success');
    window.location.assign(DOWNLOAD_PAGE);
  } catch (error) {
    console.error('Firestore submission failed:', error);
    setStatus('Could not submit your request. Please try again in a few moments.', 'error');
    setSubmitLocked(false);
  }
}

if (form) {
  form.setAttribute('novalidate', 'true');
  blockDirectSubmit(form);
  form.addEventListener('submit', handleSubmit);
}
