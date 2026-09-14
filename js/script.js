(() => {
  'use strict';

  const nav = document.getElementById('mainNav');
  const backTop = document.getElementById('backTop');
  const year = document.getElementById('year');
  const navLinks = [...document.querySelectorAll('.nav-link')];
  const sections = navLinks.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  year.textContent = new Date().getFullYear();

  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
    backTop.classList.toggle('show', window.scrollY > 500);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' }));

  navLinks.forEach(link => link.addEventListener('click', () => {
    const menu = document.getElementById('navMenu');
    if (menu.classList.contains('show') && window.bootstrap) bootstrap.Collapse.getOrCreateInstance(menu).hide();
  }));

  const revealElements = document.querySelectorAll('.reveal');
  if (reducedMotion || !('IntersectionObserver' in window)) {
    revealElements.forEach(el => el.classList.add('visible'));
  } else {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.12 });
    revealElements.forEach(el => observer.observe(el));
  }

  if ('IntersectionObserver' in window) {
    const navObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const id = `#${entry.target.id}`;
      navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === id));
    }), { rootMargin: '-36% 0px -52% 0px', threshold: 0 });
    sections.forEach(section => navObserver.observe(section));
  }

  const skillIcons = {
    'Machine Learning':'bi bi-cpu', 'Deep Learning':'bi bi-layers', 'Transformers':'bi bi-diagram-3', 'LLMs':'bi bi-chat-square-text', 'RAG':'bi bi-search', 'Generative AI':'bi bi-stars', 'AI Agents':'bi bi-robot', 'Agentic AI':'bi bi-robot', 'Semi-supervised Learning':'bi bi-bezier2', 'Model Fine-tuning':'bi bi-sliders', 'Model Evaluation':'bi bi-clipboard-data', 'Research Paper Reproduction':'bi bi-journal-code',
    'YOLO':'bi bi-bounding-box', 'Ultralytics':'bi bi-lightning-charge', 'RF-DETR':'bi bi-cpu', 'FaceNet':'bi bi-person-bounding-box', 'MTCNN':'bi bi-person-bounding-box', 'TESTR':'bi bi-alphabet', 'UNITS':'bi bi-fonts', 'HTS':'bi bi-card-text', 'ByteTrack':'bi bi-diagram-3', 'DeepSORT':'bi bi-sort-down', 'SlowFast':'bi bi-speedometer2', 'SAHI':'bi bi-search', 'CBAM':'bi bi-bezier2', 'OCR':'bi bi-file-earmark-text',
    'AWS':'devicon-amazonwebservices-plain-wordmark colored', 'Docker':'devicon-docker-plain colored', 'Terraform':'devicon-terraform-plain colored', 'Databricks':'devicon-databricks-plain colored', 'MLOps':'bi bi-infinity', 'SageMaker':'devicon-amazonwebservices-plain-wordmark colored', 'EC2':'devicon-amazonwebservices-plain-wordmark colored', 'ECR':'devicon-amazonwebservices-plain-wordmark colored', 'ECS/Fargate':'devicon-amazonwebservices-plain-wordmark colored', 'S3':'devicon-amazonwebservices-plain-wordmark colored', 'Lambda':'devicon-amazonwebservices-plain-wordmark colored', 'RDS':'devicon-amazonwebservices-plain-wordmark colored', 'CloudWatch':'devicon-amazonwebservices-plain-wordmark colored', 'Textract':'devicon-amazonwebservices-plain-wordmark colored', 'Comprehend':'devicon-amazonwebservices-plain-wordmark colored', 'Glue':'devicon-amazonwebservices-plain-wordmark colored', 'Kinesis':'devicon-amazonwebservices-plain-wordmark colored', 'Firehose':'devicon-amazonwebservices-plain-wordmark colored', 'Athena':'devicon-amazonwebservices-plain-wordmark colored', 'ETL Pipelines':'bi bi-diagram-3',
    'PyTorch':'devicon-pytorch-original colored', 'TensorFlow':'devicon-tensorflow-original colored', 'FastAPI':'devicon-fastapi-plain colored', 'Flask':'devicon-flask-original', 'Django':'devicon-django-plain colored', 'LangChain':'bi bi-link-45deg', 'LangGraph':'bi bi-diagram-3', 'TensorRT':'bi bi-gpu-card', 'BERT':'bi bi-chat-left-text', 'Stable Diffusion':'bi bi-stars',
    'Java':'devicon-java-plain colored', 'Spring Boot':'devicon-spring-original colored', 'Spring Cloud':'devicon-spring-original colored', 'REST APIs':'bi bi-braces-asterisk', 'Microservices':'bi bi-diagram-3', 'System Design':'bi bi-diagram-2', 'Spring Data JPA':'devicon-spring-original colored', 'Eureka':'devicon-spring-original colored', 'API Gateway':'bi bi-signpost-split', 'OpenFeign':'devicon-java-plain colored', 'RestTemplate':'devicon-spring-original colored', 'Swagger/OpenAPI':'devicon-swagger-plain colored', 'Maven':'devicon-maven-plain colored', 'JUnit':'devicon-junit-plain colored', 'Angular':'devicon-angular-plain colored', 'React.js':'devicon-react-original colored', 'Node.js':'devicon-nodejs-plain colored', 'Jinja':'devicon-jinja-plain', 'Git':'devicon-git-plain colored',
    'Python':'devicon-python-plain colored', 'C++':'devicon-cplusplus-plain colored', 'C':'devicon-c-plain colored', 'SQL':'devicon-azuresqldatabase-plain colored', 'R':'devicon-r-plain colored', 'Prolog':'bi bi-braces', 'JavaScript':'devicon-javascript-plain colored', 'HTML':'devicon-html5-plain colored', 'CSS':'devicon-css3-plain colored', 'MySQL':'devicon-mysql-plain colored', 'MongoDB':'devicon-mongodb-plain colored', 'PostgreSQL':'devicon-postgresql-plain colored', 'SQLite':'devicon-sqlite-plain colored', 'EDA':'bi bi-bar-chart-line', 'Feature Engineering':'bi bi-tools', 'Cross-validation':'bi bi-check2-square', 'Hyperparameter Tuning':'bi bi-sliders', 'SVM':'bi bi-graph-up-arrow', 'KNN':'bi bi-diagram-2', 'Decision Trees':'bi bi-diagram-2'
  };

  document.querySelectorAll('.skill-tags').forEach(container => {
    const tags = (container.dataset.tags || '').split('|').filter(Boolean);
    container.innerHTML = tags.map(tag => `<span><i class="${skillIcons[tag] || 'bi bi-code-square'}" aria-hidden="true"></i>${tag}</span>`).join('');
  });

  const projects = [
    {
      id: 'docchat', category: 'ai', icon: 'bi-file-earmark-richtext', title: 'DocChat — Multilingual Multimodal Document Intelligence & RAG', date: 'AI / RAG Project',
      summary: 'Multimodal RAG for handwritten, printed, scanned, distorted, and multilingual Indian-language documents.',
      tech: [['bi-eye','Qwen3-VL 8B'],['bi-diagram-3','FAISS'],['bi-link-45deg','LangChain'],['bi-stars','Llama 3.1 8B'],['bi-search','RAG']],
      sections: [
        ['Engineering Overview', '<p>Engineered a multimodal RAG pipeline for handwritten, printed, scanned, distorted, and multilingual Indian-language documents, leveraging <strong>Qwen3-VL 8B</strong> for visual document understanding and semantic representation.</p>'],
        ['Retrieval', '<p>Generated document embeddings, indexed them in a <strong>FAISS</strong> vector database, and implemented semantic similarity search with configurable <strong>Top-K retrieval</strong> to retrieve relevant document context for user queries.</p>'],
        ['Orchestration', '<p>Integrated <strong>LangChain</strong> to orchestrate document processing, vector retrieval, prompt construction, and context augmentation across the RAG workflow.</p>'],
        ['Generation', '<p>Integrated <strong>Llama 3.1 8B</strong> as the generation model to perform context-grounded question answering over retrieved document information.</p>'],
        ['Architecture', '<div class="modal-architecture">Multilingual Documents → Qwen3-VL 8B → Embeddings → FAISS → Query Embedding/Retrieval → Top-K Context → LangChain → Llama 3.1 8B → Answer</div>']
      ]
    },
    {
      id: 'traffic', category: 'ai', icon: 'bi-camera-video', title: 'Real-Time Traffic Rule Enforcement with Drones', date: 'M.Tech Thesis | Jun 2025 – May 2026',
      summary: 'UAV-based traffic surveillance combining detection, helmet violations, plate localization, recognition, and real-time enforcement.',
      tech: [['bi-bounding-box-circles','YOLOv11 / YOLOv26'],['bi-cpu-fill','RF-DETR'],['bi-search','SAHI'],['bi-alphabet','TESTR'],['bi-card-text','OCR']],
      sections: [
        ['Research', '<p>Developed an end-to-end UAV-based traffic-rule enforcement pipeline integrating deep-learning detection, helmet-violation analysis, license-plate localization, and recognition for real-time aerial surveillance.</p>'],
        ['Results', '<ul><li>99.30% mAP@50 with YOLOv11m</li><li>87.88% mAP@50:95 with RF-DETR Base</li><li>92.38% Word Accuracy and 2.42% CER with TESTR</li><li>~104 ms end-to-end latency for YOLO + TESTR</li></ul>'],
        ['Approach', '<p>Applied semi-supervised learning with YOLO-based detectors, CBAM, SAHI, RF-DETR, TESTR, UNITS, HTS-based OCR, and spatial association for dynamic traffic scenes.</p>'],
        ['Patent', '<p>AI-enabled drone system for automated traffic rule violation monitoring. Application No. <strong>202521129482</strong>; approval pending.</p>']
      ]
    },
    {
      id: 'crop', category: 'ai', icon: 'bi-bar-chart-line', title: 'Intelligent Crop Yield Prediction for Precision Farming', date: 'Jan 2025 – Apr 2025', summary: 'Crop yield prediction and recommendation system for 22 crop types using controlled, cross-validated experiments.',
      tech: [['bi-graph-up-arrow','SVM'],['bi-diagram-2','KNN'],['bi-git','Decision Tree']],
      link: 'https://github.com/kashyap9107/Intelligent-Crop-Yield-Prediction-for-Precision-Farming',
      sections: [['Approach','<p>Performed EDA, class-wise statistical imputation, feature engineering, controlled cross-validation, and hyperparameter tuning for KNN, Decision Tree, and SVM.</p>'],['Results','<ul><li>SVM: 98% classification accuracy with precision/recall/F1 &gt; 0.95</li><li>KNN: R² of 0.93 for yield estimation</li></ul>']]
    },
    {
      id: 'attendance', category: 'ai', icon: 'bi-person-check', title: 'Automated Attendance System using Image Processing', date: 'Oct 2021 – Oct 2022', summary: 'Real-time classroom attendance using MTCNN face alignment, FaceNet embeddings, Flask, AWS, and incremental learning.',
      tech: [['devicon-python-plain','Python'],['devicon-tensorflow-original','TensorFlow'],['bi-person-bounding-box','MTCNN'],['bi-cpu','FaceNet'],['bi-cloud','AWS']],
      link: 'https://github.com/HACKER-OO7/Face-recognition-using--image-processing',
      extraLinks: [{url: 'https://www.linkedin.com/posts/kashyap-gorasiya_project-work-facialrecognition-activity-7032431542626885633-IEWV?utm_source=share&utm_medium=member_desktop&rcm=ACoAAC_LPP8B5RI9xUEClyzZHVf5I89ZJi4GhSs', label: 'LinkedIn Post & Video', icon: 'bi-linkedin'}],
      sections: [['Approach','<p>Built face detection and alignment with MTCNN and fine-tuned FaceNet to generate 128-dimensional facial embeddings for identity matching.</p>'],['Results / Deployment','<p>Achieved 83% precision and deployed real-time attendance processing on AWS EC2, with incremental learning for adding new identities and automated absence notifications to parents.</p>']]
    },
    {
      id: 'mining', category: 'ai', icon: 'bi-shield-exclamation', title: 'NLP-Based Mining Risk Classification System', date: '', summary: 'End-to-end NLP pipeline for 40+ mining safety-risk categories with multilingual preprocessing and BERT fine-tuning.',
      tech: [['devicon-pytorch-original','PyTorch'],['bi-chat-left-text','BERT'],['bi-translate','English / French'],['bi-cloud','SageMaker']],
      sections: [['Approach','<p>Performed large-scale data cleaning, null handling, text standardization, multilingual normalization, and BERT fine-tuning using PyTorch on AWS SageMaker.</p>'],['Outcome','<p>Improved classification accuracy, particularly for rare and unknown risk classes, and designed a deployable PyTorch inference pipeline.</p>']]
    },
    {
      id: 'vehicles', category: 'ai', icon: 'bi-car-front', title: 'Car Detection, Tracking, and Counting System', date: '', summary: 'Real-time high-resolution vehicle detection, multi-object tracking, counting, and flow analytics.',
      tech: [['bi-bounding-box','YOLOv5 / YOLOv8'],['bi-diagram-3','ByteTrack'],['bi-person-lines-fill','DeepSORT'],['bi-camera-reels','SlowFast'],['bi-cloud','AWS EC2 GPU']],
      sections: [['Approach','<p>Fine-tuned YOLOv5 and YOLOv8 and integrated ByteTrack and DeepSORT for robust multi-object tracking, ID association, and vehicle counting.</p>'],['Deployment','<p>Optimized low-latency inference and deployed detection/tracking systems on AWS EC2 GPU instances for production testing.</p>']]
    },
    {
      id: 'documents', category: 'ai', icon: 'bi-file-earmark-text', title: 'End-to-End Bill Processing and Document Understanding API', date: '', summary: 'Scalable invoice and bill processing pipeline converting unstructured documents into structured JSON.',
      tech: [['bi-file-earmark-richtext','AWS Textract'],['bi-lightning-charge','AWS Lambda'],['bi-diagram-3','Comprehend'],['bi-cloud','AWS'],['bi-gear','Terraform']],
      sections: [['Approach','<p>Used AWS Textract to extract tables, line items, and key-value pairs and designed serverless Lambda APIs for structured JSON output and downstream enterprise processing.</p>']]
    },
    {
      id: 'stable', category: 'ai', icon: 'bi-stars', title: 'Logo Generation Using Stable Diffusion', date: '', summary: 'S3-driven ETL and generative AI pipeline for 50K+ logo images with reproducible fine-tuning and quality filtering.',
      tech: [['devicon-pytorch-original','PyTorch'],['bi-stars','Stable Diffusion'],['devicon-docker-plain','Docker'],['bi-cloud','S3'],['bi-tools','Terraform']],
      sections: [['Approach','<p>Processed 50K+ images through corrupted-image detection, resizing, normalization, filtering, Stable Diffusion fine-tuning, and prompt engineering with structured and negative prompts.</p>'],['Pipeline','<p>Orchestrated reproducible workflows using Docker and Terraform and stored generated assets and metadata back to AWS S3.</p>']]
    },
    {
      id: 'resnet', category: 'ai', icon: 'bi-diagram-3', title: 'Transfer Learning Project — ResNet', date: 'Academic Project', summary: 'Transfer learning from CIFAR-10 to CIFAR-100 using a frozen ResNet-50 backbone and fine-tuned classification layers.',
      tech: [['devicon-pytorch-original','PyTorch'],['bi-diagram-3','ResNet-50'],['bi-image','CIFAR-10 → CIFAR-100'],['bi-gpu-card','GPU']],
      sections: [['Approach','<p>Trained ResNet-50 on CIFAR-10, reused pretrained weights as a frozen backbone, and fine-tuned only the top classification layers for CIFAR-100 adaptation.</p>'],['Concepts','<p>Applied feature reuse, freezing and fine-tuning, image classification, and dataset adaptation.</p>']]
    },
    {
      id: 'quickquiz', category: 'software', icon: 'bi-ui-checks-grid', title: 'QuickQuiz — Real-Time Quiz Web Application', date: 'Sep 2024 – Nov 2024', summary: 'Real-time multi-user quiz platform with RBAC, randomized quizzes, timed auto-submission, leaderboards, and analytics.',
      tech: [['devicon-django-plain','Django'],['devicon-javascript-plain','JavaScript'],['bi-filetype-html','HTML/CSS'],['bi-database','SQLite']],
      link: 'https://github.com/HACKER-OO7/QuickQuiz',
      sections: [['Features','<p>Implemented role-based access for students, teachers, and administrators; subject-wise quizzes; randomized questions; cookie-based session tracking; timed auto-submission; real-time score computation; leaderboards; and graphical analytics.</p>']]
    },
    {
      id: 'ecommerce', category: 'software', icon: 'bi-cart3', title: 'E-Commerce Web Application', date: 'Dec 2022 – Feb 2023', summary: 'Full-stack e-commerce platform built during the Ciesto Solutions internship.',
      tech: [['devicon-react-original','React.js'],['devicon-nodejs-plain','Node.js'],['devicon-mongodb-plain','MongoDB'],['devicon-javascript-plain','JavaScript']],
      sections: [['Features','<p>Implemented authentication, product catalog management, shopping cart functionality, order workflows, RESTful APIs, frontend-backend integration, and database design.</p>']]
    },
    {
      id: 'social', category: 'software', icon: 'bi-database', title: 'Social Media Database Management System', date: 'Aug 2021 – Nov 2021', summary: 'Relational database for users, posts, likes, comments, friends, and follow relationships.',
      tech: [['devicon-postgresql-plain','PostgreSQL'],['bi-database','SQL'],['bi-diagram-2','Triggers / Functions']],
      link: 'https://github.com/kashyap9107/Social-Media-Database-Management-System',
      sections: [['Implementation','<p>Used PostgreSQL with SQL queries, functions, triggers, cursors, and constraints to model social-media interactions and relationships.</p>']]
    },
    {
      id: 'compiler', category: 'software', icon: 'bi-code-square', title: 'Compiler Design Project', date: 'Aug 2022 – Nov 2022', summary: 'Compiler-design project for finding the area and perimeter of circles and squares using the Gujarati language.',
      tech: [['bi-code-slash','Lexical Analysis'],['bi-braces','Syntax Analysis'],['bi-translate','Gujarati Language']],
      link: 'https://github.com/kashyap9107/Finding-Area-and-Parimeter-of-Circle-and-Square-Using-Gujarati-Language',
      sections: [['Implementation','<p>Performed lexical analysis and syntax analysis phases of the compiler using a Gujarati-language example.</p>']]
    }
  ];

  const projectGrid = document.getElementById('projectGrid');
  const modalElement = document.getElementById('projectModal');
  const modal = window.bootstrap ? bootstrap.Modal.getOrCreateInstance(modalElement) : null;
  const modalTitle = document.getElementById('projectModalLabel');
  const modalCategory = document.getElementById('projectModalCategory');
  const modalBody = document.getElementById('projectModalBody');
  const modalLink = document.getElementById('projectModalLink');
  const modalExtraLinks = document.getElementById('projectModalExtraLinks');

  const techMarkup = tech => tech.map(([icon, name]) => {
    const iconClass = icon.startsWith('devicon-') ? icon : `bi ${icon}`;
    return `<span><i class="${iconClass}"></i>${name}</span>`;
  }).join('');

  const categoryLabel = category => category === 'ai' ? 'AI / Research' : 'Software Engineering';

  const renderProjects = filter => {
    const visible = projects.filter(p => p.id !== 'docchat' && (filter === 'all' || p.category === filter));
    projectGrid.innerHTML = visible.map(p => `
      <div class="col-md-6 col-xl-4 reveal visible">
        <article class="project-card" role="button" tabindex="0" data-project-id="${p.id}" aria-label="Open details for ${p.title}">
          <div class="project-icon"><i class="bi ${p.icon}"></i></div>
          ${p.date ? `<div class="project-date">${p.date}</div>` : ''}
          <h3>${p.title}</h3>
          <p class="project-summary">${p.summary}</p>
          <div class="project-tech">${techMarkup(p.tech)}</div>
          <div class="project-more">Click to view details <i class="bi bi-arrow-right"></i></div>
        </article>
      </div>`).join('');

    projectGrid.querySelectorAll('.project-card').forEach(card => {
      const open = () => openProject(card.dataset.projectId);
      card.addEventListener('click', open);
      card.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
      });
    });
  };

  const openProject = id => {
    const project = projects.find(p => p.id === id);
    if (!project) return;
    modalTitle.textContent = project.title;
    modalCategory.textContent = `${categoryLabel(project.category)} • ${project.date}`;
    modalBody.innerHTML = project.sections.map(([heading, content]) => `<div class="modal-section"><h4>${heading}</h4>${content}</div>`).join('');
    modalExtraLinks.innerHTML = (project.extraLinks || []).map(link => `<a class="btn btn-outline-primary" href="${link.url}" target="_blank" rel="noopener noreferrer"><i class="bi ${link.icon || 'bi-box-arrow-up-right'} me-2"></i>${link.label}</a>`).join('');
    if (project.link) {
      modalLink.href = project.link;
      modalLink.innerHTML = `<i class="bi ${project.linkIcon || 'bi-github'} me-2"></i>${project.linkLabel || 'Open Project'}`;
      modalLink.classList.remove('d-none');
    } else {
      modalLink.classList.add('d-none');
      modalLink.removeAttribute('href');
    }
    modal?.show();
  };

  document.querySelectorAll('.filter-btn').forEach(btn => btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.toggle('active', b === btn));
    renderProjects(btn.dataset.filter);
  }));
  renderProjects('all');

  if ('IntersectionObserver' in window && !reducedMotion) {
    const metricObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.querySelectorAll('[data-counter]').forEach(el => {
        const value = parseFloat(el.dataset.counter);
        const suffix = el.textContent.replace(/[\d.]/g, '');
        const steps = 28;
        let current = 0;
        let step = 0;
        const timer = setInterval(() => {
          step += 1;
          current = value * (step / steps);
          el.textContent = `${current.toFixed(2)}${suffix}`;
          if (step >= steps) { clearInterval(timer); el.textContent = `${value.toFixed(2)}${suffix}`; }
        }, 24);
      });
      metricObserver.unobserve(entry.target);
    }), { threshold: .4 });
    document.querySelectorAll('.metric-grid').forEach(grid => metricObserver.observe(grid));
  }
})();
