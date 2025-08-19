// 主题切换逻辑
(function () {
  const key = 'modpc-theme';
  const saved = localStorage.getItem(key);

  // 应用保存的主题
  if (saved === 'light') {
    document.documentElement.classList.add('light');
  }

  const btn = document.getElementById('themeToggle');
  const icon = btn.querySelector('.icon');
  const text = btn.querySelector('.text');

  // 更新按钮状态
  function update() {
    const isLight = document.documentElement.classList.contains('light');
    icon.textContent = isLight ? '☀️' : '🌙';
    text.textContent = isLight ? '亮色' : '暗色';
    localStorage.setItem(key, isLight ? 'light' : 'dark');
  }

  // 绑定点击事件
  btn.addEventListener('click', function () {
    document.documentElement.classList.toggle('light');
    update();
  });

  // 初始化按钮状态
  update();
})();

// 自动填充当前年份
document.addEventListener('DOMContentLoaded', function () {
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});