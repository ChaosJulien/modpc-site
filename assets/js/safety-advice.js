// security-advice.js
function insertSecurityAdvice() {
    const adviceHTML = `
        <section class="security-section">
            <h2>🔐 安全使用建议</h2>
            <div class="warning">⚠️ 使用第三方工具存在风险，请务必仔细阅读以下建议，保护您的账号与设备安全。</div>
            <ul>
                <li><strong>只从官方渠道下载</strong>：所有工具应通过本平台或指定 Discord/KOOK 社区获取，切勿相信 Telegram、QQ 群、百度网盘分享等非官方来源。</li>
                <li><strong>警惕“破解版”“免费版”</strong>：任何声称可绕过验证或收费机制的版本，极可能是木马或盗号程序。</li>
                <li><strong>不运行未知 .exe/.dll 文件</strong>：尤其是经过压缩或混淆的程序，建议使用杀毒软件扫描。</li>
                <li><strong>避免共用账号</strong>：不要将您的 MODPC 账号、授权信息分享给他人，防止被封或滥用。</li>
                <li><strong>定期检查授权状态</strong>：如发现异常登录或工具失效，请及时联系维护者并更换凭证。</li>
                <li><strong>关闭杀毒误报？谨慎操作</strong>：若杀毒软件报警，优先上传至 VirusTotal 检测，不建议直接关闭防护。</li>
            </ul>
        </section>
    `;

    const footer = document.querySelector('footer');
    if (footer) {
        const container = document.createElement('div');
        container.innerHTML = adviceHTML;
        footer.before(container.firstElementChild);
    } else {
        document.body.insertAdjacentHTML('beforeend', adviceHTML);
    }
}

document.addEventListener('DOMContentLoaded', insertSecurityAdvice);