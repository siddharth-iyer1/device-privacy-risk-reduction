document.addEventListener('DOMContentLoaded', () => {
    const pickDirectoryButton = document.getElementById('pick-directory');
    const fileListContainer = document.getElementById('file-list-container');

    pickDirectoryButton.addEventListener('click', async () => {
        try {
            const files = await window.electronAPI.pickDirectory();
            fileListContainer.innerHTML = '';

            if (files.error) {
                throw new Error(files.error);
            }

            files.forEach((file) => {
                const item = document.createElement('div');
                item.className = 'file-item';
                item.textContent =
                    file.kind === 'file'
                        ? `File: ${file.name}`
                        : `Directory: ${file.name}`;
                fileListContainer.appendChild(item);
            });
        } catch (error) {
            console.error('Error accessing directory:', error);
            fileListContainer.textContent = `Error: ${error.message}`;
        }
    });
});
