async function loadStudents() {
  const res = await fetch('/api/students');
  const data = await res.json();
  const list = document.getElementById('studentList');
  list.innerHTML = '';
  data.forEach(student => {
    const li = document.createElement('li');
    li.innerHTML = `${student.name} (Grade: ${student.grade})
      <button onclick="editStudent(${student.id}, '${student.name}', '${student.grade}')">Edit</button>
      <button onclick="deleteStudent(${student.id})">Delete</button>`;
    list.appendChild(li);
  });
}

document.getElementById('studentForm')?.addEventListener('submit', async e => {
  e.preventDefault();
  const name = document.getElementById('studentName').value;
  const grade = document.getElementById('studentGrade').value;
  await fetch('/api/students', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, grade })
  });
  e.target.reset();
  loadStudents();
});

async function deleteStudent(id) {
  await fetch(`/api/students/${id}`, { method: 'DELETE' });
  loadStudents();
}

async function editStudent(id, currentName, currentGrade) {
  const name = prompt('Edit name:', currentName);
  const grade = prompt('Edit grade:', currentGrade);
  if (name && grade) {
    await fetch(`/api/students/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, grade })
    });
    loadStudents();
  }
}

loadStudents();
