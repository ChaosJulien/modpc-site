// external-link-warning.js
// 功能：动态创建外链警告弹窗，完全无需在 HTML 中写 modal 结构
// 适用于所有含有 data-discord 属性的链接，点击时弹出提示
// 使用方法：<a href="#" data-discord="邀请代码" class="external-link">链接文本</a>

(function() {
	// 弹窗是否已创建
	let modalCreated = false;

	// 创建弹窗结构
	function createWarningModal() {
		if (modalCreated) return;

		const modal = document.createElement('div');
		modal.id = 'external-warning-modal';
		modal.className = 'modal-overlay';
		modal.style.cssText = `
            display: none;
            position: fixed;
            top: 0; left: 0;
            width: 100%; height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            animation: fadeIn 0.2s ease-out;
        `;

		modal.innerHTML = `
  <div class="modal-content" style="
    background: #fff;
    padding: 1.8rem;
    border-radius: 0.75rem;
    max-width: 90%;
    width: 420px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.15);
    text-align: center;
    animation: fadeScaleIn 0.25s ease-out;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  ">
    <h3 style="
  font-size: 1.25rem; 
  font-weight: 600; 
  margin: -0.25rem 0 0.75rem; 
  color: #dc2626;
">
  ⚠️ 网络访问提示 ⚠️
</h3>

    <p style="color: #334155; line-height: 1.6; margin-bottom: 0.5rem;">
      Discord 在中国大陆网络环境下 <strong>无法直接访问</strong>，需要特殊网络环境才能打开。
    </p>
    <p style="color: #475569; line-height: 1.6;">
      如果您无法访问，请联系管理员确认是否有备用交流方式（如 QQ 群、Telegram 等）。
    </p>
    <div class="modal-buttons" style="
      margin-top: 1.5rem; 
      display: flex; 
      justify-content: center; 
      gap: 1rem;
    ">
      <button type="button" class="btn-secondary" style="
        background-color: #f1f5f9;
        color: #334155;
        border: 1px solid #e2e8f0;
        padding: 0.55rem 1.2rem;
        border-radius: 0.5rem;
        cursor: pointer;
        transition: background-color 0.2s;
      " onmouseover="this.style.backgroundColor='#e2e8f0'" 
        onmouseout="this.style.backgroundColor='#f1f5f9'">
        取消
      </button>
      <button type="button" class="btn-primary" data-action="go" style="
        background-color: #2563eb;
        color: white;
        border: none;
        padding: 0.55rem 1.2rem;
        border-radius: 0.5rem;
        cursor: pointer;
        transition: background-color 0.2s;
      " onmouseover="this.style.backgroundColor='#1d4ed8'" 
        onmouseout="this.style.backgroundColor='#2563eb'">
        仍要前往
      </button>
    </div>
  </div>

  <style>
    @keyframes fadeScaleIn {
      from {
        opacity: 0;
        transform: scale(0.95);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }
  </style>
`;


		document.body.appendChild(modal);
		modalCreated = true;

		// 绑定事件
		modal.querySelector('.btn-secondary').onclick = closeExternalModal;
		modal.querySelector('[data-action="go"]').onclick = goToExternalLink;

		// 点击遮罩层关闭
		modal.onclick = function(e) {
			if (e.target === modal) {
				closeExternalModal();
			}
		};
	}

	// 显示警告
	window.showExternalWarning = function(event, inviteCode) {
		event.preventDefault();
		createWarningModal(); // 确保弹窗已创建

		const modal = document.getElementById('external-warning-modal');
		const goButton = modal.querySelector('[data-action="go"]');
		goButton.dataset.link = 'https://discord.gg/' + inviteCode;

		modal.style.display = 'flex';
	};

	// 跳转
	function goToExternalLink() {
		const modal = document.getElementById('external-warning-modal');
		const link = modal.querySelector('[data-action="go"]').dataset.link;
		if (link) {
			window.open(link, '_blank', 'noopener');
		}
		modal.style.display = 'none';
	}

	// 关闭
	function closeExternalModal() {
		document.getElementById('external-warning-modal').style.display = 'none';
	}

	// 自动绑定所有 data-discord 链接（事件委托）
	document.addEventListener('click', function(e) {
		const target = e.target;
		if (target.classList.contains('external-link') && target.hasAttribute('data-discord')) {
			e.preventDefault();
			showExternalWarning(e, target.getAttribute('data-discord'));
		}
	});

	// 动画样式（可选）
	const style = document.createElement('style');
	style.textContent = `
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleIn { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
    `;
	document.head.appendChild(style);

})();