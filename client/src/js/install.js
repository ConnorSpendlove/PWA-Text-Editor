// Get reference to the install button
const butInstall = document.getElementById('buttonInstall');
// Variable to store the installation prompt
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (event) => {
     // Prevent the default browser behavior
    event.preventDefault();
    // Store the event
    deferredPrompt = event;
    // Make the install button visible
    butInstall.style.display = 'block';
});
// Event listener for install button click
butInstall.addEventListener('click', async () => {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`User response to the install prompt: ${outcome}`);
        deferredPrompt = null;
        butInstall.style.display = 'none';
    }
});

window.addEventListener('appinstalled', (event) => {
    console.log('PWA has been installed');
    butInstall.style.display = 'none';
    deferredPrompt = null;
});