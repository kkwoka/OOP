function engineer(info){
    return `
    <div class="card employee-card">
        <div class="card-header bg-primary text-white">
            <h2 class="card-title">${info.name}</h2>
            <h3 class="card-title"><i class="fas fa-glasses mr-2"></i>${info.getRole()}</h3>
        </div>
        <div class="card-body">
            <ul class="list-group">
                <li class="list-group-item">ID: ${info.id}</li>
                <li class="list-group-item">Email: <a href="mailto:${info.email}">${info.email}</a></li>
                <li class="list-group-item">GitHub: <a href="https://github.com/${info.git}" target="_blank" rel="noopener noreferrer">${info.git}</a></li>
            </ul>
        </div>
    </div>
    `
}

module.exports = engineer;