/**
 * BUILD MY RESUME - Professional Resume Builder
 * Main JavaScript Application Logic
 */

// ============================================
// UTILITY FUNCTIONS
// ============================================

function qs(sel) {
  return document.querySelector(sel);
}

function qsa(sel) {
  return document.querySelectorAll(sel);
}

function showNotification(message, type = "info") {
  console.log(`[${type.toUpperCase()}] ${message}`);
}

// ============================================
// LOCAL STORAGE - USER & SESSION MANAGEMENT
// ============================================

function getUsers() {
  return JSON.parse(localStorage.getItem("rb_users") || "{}");
}

function saveUsers(users) {
  localStorage.setItem("rb_users", JSON.stringify(users));
}

function setSession(email) {
  localStorage.setItem("rb_session", email);
}

function getSession() {
  return localStorage.getItem("rb_session");
}

function clearSession() {
  localStorage.removeItem("rb_session");
}

// ============================================
// AUTH PAGE - LOGIN & SIGNUP
// ============================================

if (document.body.classList.contains("auth-page")) {
  const loginForm = qs("#loginForm");
  const signupForm = qs("#signupForm");
  const showSignupLink = qs("#showSignup");
  const showLoginLink = qs("#showLogin");

  // Form switching
  showSignupLink.addEventListener("click", (e) => {
    e.preventDefault();
    loginForm.classList.remove("active");
    signupForm.classList.add("active");
  });

  showLoginLink.addEventListener("click", (e) => {
    e.preventDefault();
    signupForm.classList.remove("active");
    loginForm.classList.add("active");
  });

  // Login Form Submit
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = qs("#loginEmail").value.trim().toLowerCase();
    const password = qs("#loginPassword").value;

    if (!email || !password) {
      showNotification("Please fill in all fields", "warning");
      return;
    }

    const users = getUsers();
    if (users[email] && users[email].password === password) {
      setSession(email);
      showNotification("Login successful!", "success");
      setTimeout(() => {
        location.href = "dashboard.html";
      }, 500);
    } else {
      showNotification("Invalid email or password", "error");
    }
  });

  // Signup Form Submit
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = qs("#signupName").value.trim();
    const email = qs("#signupEmail").value.trim().toLowerCase();
    const password = qs("#signupPassword").value;

    if (!name || !email || !password) {
      showNotification("Please fill in all fields", "warning");
      return;
    }

    if (password.length < 6) {
      showNotification("Password must be at least 6 characters", "warning");
      return;
    }

    const users = getUsers();
    if (users[email]) {
      showNotification("Account already exists. Please sign in.", "error");
      return;
    }

    users[email] = { name, email, password };
    saveUsers(users);
    setSession(email);
    showNotification("Account created successfully!", "success");
    setTimeout(() => {
      location.href = "dashboard.html";
    }, 500);
  });
}

// ============================================
// DASHBOARD PAGE
// ============================================

if (document.body.classList.contains("dashboard-page")) {
  const session = getSession();
  if (!session) {
    location.href = "index.html";
  }

  const users = getUsers();
  const user = users[session] || {};
  const welcomeTitle = qs("#welcomeTitle");
  const newResumeBtn = qs("#newResumeBtn");
  const logoutBtn = qs("#logoutBtn");
  const resumesList = qs("#resumesList");

  // Welcome message
  if (welcomeTitle) {
    welcomeTitle.textContent = `Welcome back, ${user.name || session.split("@")[0]}!`;
  }

  // Logout functionality
  logoutBtn.addEventListener("click", () => {
    clearSession();
    location.href = "index.html";
  });

  // New resume button
  newResumeBtn.addEventListener("click", () => {
    location.href = "builder.html?template=1";
  });

  // Load saved resumes
  function loadSavedResumes() {
    const key = `resumes_${session}`;
    const resumes = JSON.parse(localStorage.getItem(key) || "[]");

    if (resumes.length === 0) {
      resumesList.innerHTML =
        '<p class="text-muted" style="grid-column: 1 / -1;">No saved resumes yet. Create your first resume!</p>';
      return;
    }

    resumesList.innerHTML = resumes
      .map(
        (resume) => `
      <div class="resume-item">
        <h3>${resume.name || "Untitled Resume"}</h3>
        <p class="text-muted" style="font-size: 0.8rem;">Saved: ${new Date(resume.id).toLocaleDateString()}</p>
        <div class="resume-item-actions">
          <a href="builder.html?id=${resume.id}" class="btn primary" style="text-decoration: none;">Edit</a>
          <button class="btn danger" style="flex: 1;" onclick="deleteResume(${resume.id})">Delete</button>
        </div>
      </div>
    `,
      )
      .join("");
  }

  window.deleteResume = function (id) {
    if (confirm("Are you sure you want to delete this resume?")) {
      const key = `resumes_${session}`;
      let resumes = JSON.parse(localStorage.getItem(key) || "[]");
      resumes = resumes.filter((r) => r.id !== id);
      localStorage.setItem(key, JSON.stringify(resumes));
      loadSavedResumes();
      showNotification("Resume deleted", "success");
    }
  };

  loadSavedResumes();

  // Template Filter Buttons
  const filterBtns = qsa(".filter-btn");
  const templateCards = qsa(".template-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove active class from all buttons
      filterBtns.forEach((b) => b.classList.remove("active"));
      // Add active class to clicked button
      btn.classList.add("active");

      const selectedFilter = btn.getAttribute("data-filter");

      // Show/hide templates based on filter
      templateCards.forEach((card) => {
        const cardLevel = card.getAttribute("data-level");
        if (
          selectedFilter === "all" ||
          cardLevel === selectedFilter ||
          cardLevel === "all"
        ) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}

// ============================================
// BUILDER PAGE - RESUME EDITOR
// ============================================

if (document.body.classList.contains("builder-page")) {
  const session = getSession();
  if (!session) {
    location.href = "index.html";
  }

  // Get template from URL
  const params = new URLSearchParams(location.search);
  const templateId = params.get("template") || "1";
  const resumeId = params.get("id");

  // DOM Elements
  const inputName = qs("#inputName");
  const inputEmail = qs("#inputEmail");
  const inputPhone = qs("#inputPhone");
  const inputSummary = qs("#inputSummary");
  const inputExperience = qs("#inputExperience");
  const inputEducation = qs("#inputEducation");
  const inputSkills = qs("#inputSkills");
  const inputProjects = qs("#inputProjects");
  const inputCertificates = qs("#inputCertificates");
  const backBtn = qs("#backBtn");
  const saveBtn = qs("#saveBtn");
  const downloadBtn = qs("#downloadBtn");
  const templatePreview = qs("#templatePreview");

  // Set template
  templatePreview.className = `resume template-${templateId}`;

  // Live Preview Binding
  function bindInput(
    inputElement,
    outputElement,
    outputFormatter = (val) => val,
  ) {
    const sectionId = outputElement.id + "Section";
    const sectionElement = qs(`#${sectionId}`);

    inputElement.addEventListener("input", () => {
      const value = inputElement.value.trim();
      outputElement.innerHTML =
        value || outputElement.getAttribute("data-default");

      // Show/hide sections
      if (sectionElement) {
        sectionElement.style.display = value ? "block" : "none";
      }
    });
  }

  // Bind Name
  bindInput(inputName, qs("#rName"));

  // Bind Contact Info
  inputEmail.addEventListener("input", updateContact);
  inputPhone.addEventListener("input", updateContact);

  function updateContact() {
    const email = inputEmail.value.trim() || "email";
    const phone = inputPhone.value.trim();
    const contact = phone ? `${email} • ${phone}` : email;
    qs("#rContact").textContent = contact;
  }

  // Bind Summary
  bindInput(inputSummary, qs("#rSummary"));

  // Bind Experience
  inputExperience.addEventListener("input", () => {
    const value = inputExperience.value.trim();
    const experienceDiv = qs("#rExperience");
    const sectionElement = qs("#experienceSection");

    experienceDiv.innerHTML = value
      ? value
          .split("\n")
          .filter((line) => line.trim())
          .map((line) => `<div class="r-entry-content">${line}</div>`)
          .join("")
      : experienceDiv.getAttribute("data-default");

    if (sectionElement) {
      sectionElement.style.display = value ? "block" : "none";
    }
  });

  // Bind Education - Multiple Fields
  const inputCollegeName = qs("#inputCollegeName");
  const inputDegree = qs("#inputDegree");
  const inputGraduationYear = qs("#inputGraduationYear");
  const inputPercentage = qs("#inputPercentage");

  function updateEducation() {
    const college = inputCollegeName.value.trim();
    const degree = inputDegree.value.trim();
    const year = inputGraduationYear.value.trim();
    const percentage = inputPercentage.value.trim();

    const educationDiv = qs("#rEducation");
    const sectionElement = qs("#educationSection");

    if (college || degree || year || percentage) {
      let educationHtml = "";
      if (degree) educationHtml += `<div class="r-entry-title">${degree}</div>`;
      if (college)
        educationHtml += `<div class="r-entry-subtitle">${college}</div>`;
      let details = [];
      if (year) details.push(`Graduated: ${year}`);
      if (percentage) details.push(`GPA: ${percentage}`);
      if (details.length > 0) {
        educationHtml += `<div class="r-entry-content">${details.join(" • ")}</div>`;
      }
      educationDiv.innerHTML = educationHtml;
    } else {
      educationDiv.innerHTML = educationDiv.getAttribute("data-default");
    }

    if (sectionElement) {
      sectionElement.style.display =
        college || degree || year || percentage ? "block" : "none";
    }
  }

  inputCollegeName.addEventListener("input", updateEducation);
  inputDegree.addEventListener("input", updateEducation);
  inputGraduationYear.addEventListener("input", updateEducation);
  inputPercentage.addEventListener("input", updateEducation);

  // Bind Skills
  inputSkills.addEventListener("input", () => {
    const value = inputSkills.value.trim();
    const skillsDiv = qs("#rSkills");
    const sectionElement = qs("#skillsSection");

    if (value) {
      skillsDiv.innerHTML = value
        .split(",")
        .map((skill) => `<span class="skill-badge">${skill.trim()}</span>`)
        .join("");
    } else {
      skillsDiv.innerHTML = skillsDiv.getAttribute("data-default");
    }

    if (sectionElement) {
      sectionElement.style.display = value ? "block" : "none";
    }
  });

  // Bind Projects
  bindInput(inputProjects, qs("#rProjects"));
  inputProjects.addEventListener("input", () => {
    const value = inputProjects.value.trim();
    const projectsDiv = qs("#rProjects");
    const sectionElement = qs("#projectsSection");

    projectsDiv.innerHTML = value
      ? value
          .split("\n")
          .filter((line) => line.trim())
          .map((line) => `<div class="r-entry-content">${line}</div>`)
          .join("")
      : projectsDiv.getAttribute("data-default");

    if (sectionElement) {
      sectionElement.style.display = value ? "block" : "none";
    }
  });

  // Bind Certificates
  bindInput(inputCertificates, qs("#rCertificates"));
  inputCertificates.addEventListener("input", () => {
    const value = inputCertificates.value.trim();
    const certificatesDiv = qs("#rCertificates");
    const sectionElement = qs("#certificatesSection");

    certificatesDiv.innerHTML = value
      ? value
          .split("\n")
          .filter((line) => line.trim())
          .map((line) => `<div class="r-entry-content">${line}</div>`)
          .join("")
      : certificatesDiv.getAttribute("data-default");

    if (sectionElement) {
      sectionElement.style.display = value ? "block" : "none";
    }
  });

  // Load existing resume if editing
  if (resumeId) {
    const key = `resumes_${session}`;
    const resumes = JSON.parse(localStorage.getItem(key) || "[]");
    const resume = resumes.find((r) => r.id === parseInt(resumeId));

    if (resume) {
      inputName.value = resume.name || "";
      inputEmail.value = resume.email || "";
      inputPhone.value = resume.phone || "";
      inputSummary.value = resume.summary || "";
      inputExperience.value = resume.experience || "";
      inputCollegeName.value = resume.collegeName || "";
      inputDegree.value = resume.degree || "";
      inputGraduationYear.value = resume.graduationYear || "";
      inputPercentage.value = resume.percentage || "";
      inputSkills.value = resume.skills || "";
      inputProjects.value = resume.projects || "";
      inputCertificates.value = resume.certificates || "";

      // Trigger input events to update preview
      inputName.dispatchEvent(new Event("input"));
      updateContact();
      inputSummary.dispatchEvent(new Event("input"));
      inputExperience.dispatchEvent(new Event("input"));
      updateEducation();
      inputSkills.dispatchEvent(new Event("input"));
      inputProjects.dispatchEvent(new Event("input"));
      inputCertificates.dispatchEvent(new Event("input"));
    }
  }

  // Back Button
  backBtn.addEventListener("click", () => {
    location.href = "dashboard.html";
  });

  // Save Resume
  saveBtn.addEventListener("click", () => {
    const name = inputName.value.trim();

    if (!name || !inputEmail.value.trim()) {
      showNotification("Please fill in at least name and email", "warning");
      return;
    }

    const resumeData = {
      id: resumeId ? parseInt(resumeId) : Date.now(),
      name: name,
      email: inputEmail.value.trim(),
      phone: inputPhone.value.trim(),
      summary: inputSummary.value.trim(),
      experience: inputExperience.value.trim(),
      collegeName: inputCollegeName.value.trim(),
      degree: inputDegree.value.trim(),
      graduationYear: inputGraduationYear.value.trim(),
      percentage: inputPercentage.value.trim(),
      skills: inputSkills.value.trim(),
      projects: inputProjects.value.trim(),
      certificates: inputCertificates.value.trim(),
      template: templateId,
      savedAt: new Date().toISOString(),
    };

    const key = `resumes_${session}`;
    let resumes = JSON.parse(localStorage.getItem(key) || "[]");

    if (resumeId) {
      // Update existing resume
      const index = resumes.findIndex((r) => r.id === parseInt(resumeId));
      if (index !== -1) {
        resumes[index] = resumeData;
      }
    } else {
      // Add new resume
      resumes.unshift(resumeData);
    }

    localStorage.setItem(key, JSON.stringify(resumes));
    showNotification("Resume saved successfully!", "success");
  });

  // Download Resume
  downloadBtn.addEventListener("click", () => {
    const resumeHtml = templatePreview.outerHTML;
    const resumeName = inputName.value.trim().replace(/\s+/g, "_") || "resume";

    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${resumeName}</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: 'Georgia', serif; line-height: 1.6; color: #333; background: white; }
          .resume { max-width: 8.5in; margin: 0 auto; padding: 0.5in; }
          h1 { font-size: 1.8em; margin-bottom: 0.3em; }
          h2 { font-size: 1.1em; margin-top: 1em; margin-bottom: 0.5em; border-bottom: 2px solid #333; padding-bottom: 0.3em; }
          .r-entry { margin-bottom: 0.8em; }
          .skill-badge { display: inline-block; background: #f0f0f0; padding: 0.3em 0.6em; margin-right: 0.5em; border-radius: 3px; }
          @media print { body { margin: 0; padding: 0; } .resume { padding: 0; margin: 0; } }
        </style>
      </head>
      <body>
        ${resumeHtml}
      </body>
      </html>
    `;

    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${resumeName}.html`;
    link.click();
    URL.revokeObjectURL(url);

    showNotification("Resume downloaded!", "success");
  });

  // Preview Button - Navigate to Preview Page
  const previewBtn = qs("#previewBtn");
  if (previewBtn) {
    previewBtn.addEventListener("click", () => {
      // Save resume data to session storage for preview page
      const resumeData = {
        name: inputName.value.trim(),
        email: inputEmail.value.trim(),
        phone: inputPhone.value.trim(),
        summary: inputSummary.value.trim(),
        experience: inputExperience.value.trim(),
        collegeName: inputCollegeName.value.trim(),
        degree: inputDegree.value.trim(),
        graduationYear: inputGraduationYear.value.trim(),
        percentage: inputPercentage.value.trim(),
        skills: inputSkills.value.trim(),
        projects: inputProjects.value.trim(),
        certificates: inputCertificates.value.trim(),
        template: templateId,
        htmlPreview: templatePreview.outerHTML,
      };

      sessionStorage.setItem("resumePreviewData", JSON.stringify(resumeData));
      location.href = "preview.html";
    });
  }
}

// ============================================
// PREVIEW PAGE - DISPLAY & DOWNLOAD
// ============================================

if (document.body.classList.contains("preview-page")) {
  const session = getSession();
  if (!session) {
    location.href = "index.html";
  }

  const resumePreview = qs("#resumePreview");
  const backToEditorBtn = qs("#backToEditorBtn");
  const saveBtn = qs("#saveBtn");
  const backToDashboardBtn = qs("#backToDashboardBtn");

  // Load resume data from session storage
  const resumeDataJson = sessionStorage.getItem("resumePreviewData");

  if (resumeDataJson) {
    const resumeData = JSON.parse(resumeDataJson);

    // Display the HTML preview
    if (resumeData.htmlPreview) {
      resumePreview.innerHTML = resumeData.htmlPreview;
    }

    // Back to Editor Button
    backToEditorBtn.addEventListener("click", () => {
      location.href = "builder.html";
    });

    // Save Button - Save resume to localStorage
    saveBtn.addEventListener("click", () => {
      const key = `resumes_${session}`;
      const resumeToSave = {
        id: Date.now(),
        name: resumeData.name || "My Resume",
        email: resumeData.email || "",
        phone: resumeData.phone || "",
        summary: resumeData.summary || "",
        experience: resumeData.experience || "",
        collegeName: resumeData.collegeName || "",
        degree: resumeData.degree || "",
        graduationYear: resumeData.graduationYear || "",
        percentage: resumeData.percentage || "",
        skills: resumeData.skills || "",
        projects: resumeData.projects || "",
        certificates: resumeData.certificates || "",
        template: resumeData.template || "1",
        savedAt: new Date().toISOString(),
      };

      let resumes = JSON.parse(localStorage.getItem(key) || "[]");
      resumes.unshift(resumeToSave);
      localStorage.setItem(key, JSON.stringify(resumes));

      showNotification("Resume saved successfully!", "success");
    });

    // Back to Dashboard Button
    backToDashboardBtn.addEventListener("click", () => {
      sessionStorage.removeItem("resumePreviewData");
      location.href = "dashboard.html";
    });

    // Download PDF Button - Download as HTML
    const downloadLink = document.createElement("a");
    downloadLink.addEventListener("click", () => {
      const resumeName = resumeData.name.replace(/\s+/g, "_") || "resume";
      const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${resumeName}</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; background: white; }
            .resume { max-width: 8.5in; margin: 0 auto; padding: 0.5in; }
            h1 { font-size: 1.8em; margin-bottom: 0.3em; }
            h2 { font-size: 1.1em; margin-top: 1em; margin-bottom: 0.5em; border-bottom: 2px solid #333; padding-bottom: 0.3em; }
            .r-entry { margin-bottom: 0.8em; }
            .skill-badge { display: inline-block; background: #f0f0f0; padding: 0.3em 0.6em; margin-right: 0.5em; border-radius: 3px; }
            @media print { body { margin: 0; padding: 0; } .resume { padding: 0; margin: 0; } }
          </style>
        </head>
        <body>
          ${resumePreview.innerHTML}
        </body>
        </html>
      `;

      const blob = new Blob([html], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${resumeName}.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      showNotification("Resume downloaded!", "success");
    });
  } else {
    resumePreview.innerHTML =
      '<p style="padding: 2rem; text-align: center; color: #999;">No resume data available. Please create or edit a resume first.</p>';
  }
}
