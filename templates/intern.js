function intern (info){
    return `
    <div class="card employee-card">
        <div class="card-header bg-warning">
            <h2 class="card-title">${info.name}</h2>
            <h3 class="card-title"><i class="fas fa-user-graduate mr-2"></i>${info.getRole()}</h3>
        </div>
        <div class="card-body">
            <ul class="list-group">
                <li class="list-group-item">ID: ${info.id}</li>
                <li class="list-group-item">Email: <a href="mailto:${info.email}">${info.email}</a></li>
                <li class="list-group-item">College: ${info.school}</li>
            </ul>
        </div>
    </div>
    `
}
    
module.exports = intern;