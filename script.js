document.addEventListener("DOMContentLoaded", function () {
    loadIssues();
});

function createIssue() {
    const issueTitle = document.getElementById('issueTitle').value;
    const assignee = document.getElementById('assignee').value;
    const priority = document.getElementById('priority').value;

    // Validate inputs
    if (!issueTitle || !assignee || !priority) {
        alert('Please fill in all fields');
        return;
    }

    // Create issue object
    const newIssue = {
        title: issueTitle,
        assignee: assignee,
        priority: priority
    };

    // Send the issue to the server
    fetch('/api/issues', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newIssue),
    })
    .then(response => response.json())
    .then(data => {
        // Clear form fields
        document.getElementById('issueTitle').value = '';
        document.getElementById('assignee').value = '';
        document.getElementById('priority').value = 'low';

        // Reload the issues
        loadIssues();
    })
    .catch(error => console.error('Error:', error));
}

function loadIssues() {
    // Fetch issues from the server
    fetch('/api/issues')
    .then(response => response.json())
    .then(data => displayIssues(data))
    .catch(error => console.error('Error:', error));
}

function displayIssues(issues) {
    const issuesList = document.getElementById('issues');
    issuesList.innerHTML = '';

    issues.forEach(issue => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${issue.title}</strong> - Assignee: ${issue.assignee} - Priority: ${issue.priority}`;
        issuesList.appendChild(li);
    });
}