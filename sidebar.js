document.addEventListener('DOMContentLoaded', () => {
    fetch('sidebar.html')
        .then(response => response.text())
        .then(data => {
            const container = document.getElementById('sidebar-container');
            if (!container) return;
            
            container.innerHTML = data;

            // Xử lý đóng/mở Mobile Sidebar
            const sidebar = document.getElementById('sidebar');
            const mobileMenuBtn = document.getElementById('mobile-menu-btn');
            const closeSidebarBtn = document.getElementById('close-sidebar-btn');
            const overlay = document.getElementById('sidebar-overlay');
            const themeToggle = document.getElementById('theme-toggle');

            if (mobileMenuBtn && closeSidebarBtn && overlay) {
                const openSidebar = () => {
                    sidebar.classList.remove('-translate-x-full');
                    overlay.classList.remove('hidden');
                    setTimeout(() => overlay.classList.remove('opacity-0'), 10);
                };

                const closeSidebar = () => {
                    sidebar.classList.add('-translate-x-full');
                    overlay.classList.add('opacity-0');
                    setTimeout(() => overlay.classList.add('hidden'), 300);
                };

                mobileMenuBtn.addEventListener('click', openSidebar);
                closeSidebarBtn.addEventListener('click', closeSidebar);
                overlay.addEventListener('click', closeSidebar);
            }

            // Xử lý Dark Mode
            if (themeToggle) {
                themeToggle.addEventListener('click', () => {
                    document.documentElement.classList.toggle('dark');
                });
            }

            // Highlight (Active) trang hiện tại trên Menu
            const currentPath = window.location.pathname.split('/').pop() || 'index.html';
            const navLinks = document.querySelectorAll('#nav-menu a');
            
            navLinks.forEach(link => {
                const href = link.getAttribute('href');
                if (href === currentPath || (currentPath === '' && href === 'index.html')) {
                    link.className = "flex items-center px-4 py-3 text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 font-semibold rounded-xl transition-all group shadow-sm";
                } else {
                    link.className = "flex items-center px-4 py-3 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50 font-medium rounded-xl transition-all group";
                }
            });
        })
        .catch(err => console.error('Lỗi khi nạp sidebar:', err));
});
