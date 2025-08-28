// assets/js/external-link-warning.js
document.addEventListener('DOMContentLoaded', function() {
    const externalLinks = document.querySelectorAll('a[data-discord]');
    
    externalLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            
            // 显示弹窗警告
            const overlay = document.createElement('div');
            overlay.className = 'modal-overlay';
            overlay.innerHTML = `
                <div class="modal-content">
                    <h3>外链警告</h3>
                    <p>您即将访问外部链接：<strong>${link.href}</strong></p>
                    <p>请注意：我们不对第三方网站的安全性负责，请谨慎访问。</p>
                    <div class="modal-buttons">
                        <button class="btn-secondary" onclick="document.querySelector('.modal-overlay').remove()">取消</button>
                        <a href="${link.href}" target="_blank" class="btn-primary">继续访问</a>
                    </div>
                </div>
            `;
            
            document.body.appendChild(overlay);
        });
    });
});