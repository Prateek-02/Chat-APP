class EmojiPicker {
    constructor(options) {
        this.container = document.createElement('div');
        this.container.classList.add('emoji-picker-container');

        this.emojis = ['😊', '😂', '😍', '😎', '🥳', '🎉', '🤣', '❤️', '💕', '😁', '🎶', '😉', '😅', '😉', '🫡', '😶', '🤩', '🥲', 
                       '☠️', '👻', '😭', '🙁', '☹️', '😓', '👽', '👿', '🤭', '🫢', '🫣', '🥺', '🍕', '🍔', '🍟', '🌭', '🍿', '🧂',
                       '🍳', '🍭', '🍰', '🍷', '🍻', '🍾'];

        this.emojis.forEach(emoji => {
            const button = document.createElement('button');
            button.innerText = emoji;
            button.classList.add('emoji-button');
            button.addEventListener('click', () => {
                options.onSelect(emoji);
            });
            this.container.appendChild(button);
        });

        this.hide();

        document.body.appendChild(this.container);
    }

    show() {
        this.container.style.display = 'block';
    }

    hide() {
        this.container.style.display = 'none';
    }
}
