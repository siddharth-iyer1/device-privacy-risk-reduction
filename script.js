document.addEventListener('DOMContentLoaded', () => {
    const pickDirectoryButton = document.getElementById('pick-directory');
    const fileListContainer = document.getElementById('file-list-container');

    pickDirectoryButton.addEventListener('click', async () => {
        try {
            const dirHandle = await window.showDirectoryPicker();
            fileListContainer.innerHTML = '';


            for await (const entry of dirHandle.values()) {
                const item = document.createElement('div');
                item.className = 'file-item';
                item.textContent =
                entry.kind === 'file' ? `File: ${entry.name}` : `Directory: ${entry.name}`;
                console.log(item.textContent);
                fileListContainer.appendChild(item);
            }
            } catch (error) {
            console.error('Error accessing directory:', error);
            fileListContainer.textContent = `Error: ${error.message}`;
        }
    });
});
