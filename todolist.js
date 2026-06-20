// SIGNUP
function doSignup() {
  const name = document.getElementById('signup-name').value.trim();
  const email = document.getElementById('signup-email').value.trim();
  const pass = document.getElementById('signup-pass').value;
  const confirm = document.getElementById('signup-confirm').value;
  const question = document.getElementById('signup-question').value;
  const answer = document.getElementById('signup-answer').value.trim();

  if (!name || !email || !pass || !confirm || !answer) {
    alert('Please fill all fields!'); return;
  }
  if (pass.length < 8) {
    alert('Password must be at least 8 characters!'); return;
  }
  if (pass !== confirm) {
    alert('Passwords do not match!'); return;
  }

  let users = JSON.parse(localStorage.getItem('users') || '[]');
  if (users.find(u => u.email === email)) {
    alert('Account already exists! Please login.');
    window.location.href = 'login.html'; return;
  }
  users.push({ name, email, pass, question, answer: answer.toLowerCase() });
  localStorage.setItem('users', JSON.stringify(users));

  alert('🎉 Congratulations! Account created successfully!');
  window.location.href = 'login.html';
}

// LOGIN
function doLogin() {
  const email = document.getElementById('login-email').value.trim();
  const pass = document.getElementById('login-pass').value;

  if (!email || !pass) { alert('Please fill all fields!'); return; }

  let users = JSON.parse(localStorage.getItem('users') || '[]');
  const user = users.find(u => u.email === email);

  if (!user) {
    alert('No account found! Please sign up first.');
    window.location.href = 'signup.html'; return;
  }
  if (user.pass !== pass) {
    alert('Wrong password! Try again.'); return;
  }

  alert('Welcome back, ' + user.name + '! 🎉');
}

// FORGOT PASSWORD
let forgotStep = 1;

function doForgot() {
  const email = document.getElementById('forgot-email').value.trim();
  let users = JSON.parse(localStorage.getItem('users') || '[]');
  const user = users.find(u => u.email === email);

  if (forgotStep === 1) {
    if (!user) { alert('No account found!'); return; }
    const questions = {
      pet: "What is your pet's name?",
      city: "What city were you born in?",
      school: "What is your school name?"
    };
    document.getElementById('forgot-question-label').textContent = questions[user.question];
    document.getElementById('forgot-step2').style.display = 'block';
    forgotStep = 2;
    return;
  }

  const answer = document.getElementById('forgot-answer').value.trim().toLowerCase();
  const newpass = document.getElementById('forgot-newpass').value;

  if (answer !== user.answer) { alert('Wrong answer!'); return; }
  if (newpass.length < 8) { alert('Password must be at least 8 characters!'); return; }

  user.pass = newpass;
  localStorage.setItem('users', JSON.stringify(users));

  alert('✅ Password changed! Please login.');
  forgotStep = 1;
  window.location.href = 'login.html';
}