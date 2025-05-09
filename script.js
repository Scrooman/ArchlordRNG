document.addEventListener('DOMContentLoaded', () => {
    const openChestButton = document.getElementById('openChestButton');
    const chestImage = document.getElementById('chestImage');
    const itemAnimationContainer = document.getElementById('itemAnimationContainer');
    // const droppedItemImage = document.getElementById('droppedItem'); // If you need to change item src

    const menuButtons = document.querySelectorAll('.bottom-menu .menu-button');
    const screens = document.querySelectorAll('.app-container .screen');
    const mainContentContainer = document.getElementById('mainContent'); // The open-chest-screen itself

    let isAnimating = false;

    // --- Chest Opening Logic ---
    openChestButton.addEventListener('click', () => {
        if (isAnimating) return;

        isAnimating = true;
        openChestButton.disabled = true;

        // 1. (Optional) Initial chest animation (e.g., shaking)
        chestImage.classList.add('opening');

        // 2. Start item drop animation after a short delay (e.g., for chest shake to finish)
        setTimeout(() => {
            // You can dynamically set the item image here if needed
            // droppedItemImage.src = "path/to/your/newly_won_item.png";
            itemAnimationContainer.classList.add('animate-drop');
        }, 400); // Corresponds to chestShake animation duration

        // 3. Clean up after the 3-second item animation
        setTimeout(() => {
            itemAnimationContainer.classList.remove('animate-drop');
            chestImage.classList.remove('opening');
            openChestButton.disabled = false;
            isAnimating = false;

            // console.log("Item received!");
            // Add logic here: add item to inventory, show item details, etc.
        }, 3000 + 400); // Total duration: item animation (3s) + initial delay
    });

    // --- Bottom Menu Navigation Logic ---
    menuButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (isAnimating) return; // Don't switch screens during animation

            const targetScreenId = button.dataset.target;

            // Deactivate all screens and buttons
            screens.forEach(screen => screen.classList.remove('active-screen'));
            menuButtons.forEach(btn => btn.classList.remove('active'));

            // Activate the target screen and button
            const targetScreen = document.getElementById(targetScreenId) || document.querySelector(`.${targetScreenId}`); // handles both ID and classname for open-chest-screen
            if (targetScreen) {
                targetScreen.classList.add('active-screen');
            }
            button.classList.add('active');

             // Ensure the mainContent (open-chest-screen) is correctly referenced if targeted
            if (targetScreenId === 'open-chest-screen') {
                mainContentContainer.classList.add('active-screen');
            } else {
                mainContentContainer.classList.remove('active-screen'); // Hide if another screen is chosen
            }
        });
    });

    // Set the "Otwórz" screen as active by default
    const initialScreen = document.querySelector('.open-chest-screen');
    const initialButton = document.querySelector('.menu-button[data-target="open-chest-screen"]');
    if (initialScreen) initialScreen.classList.add('active-screen');
    if (initialButton) initialButton.classList.add('active');

});