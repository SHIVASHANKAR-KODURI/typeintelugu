// Register specific font sizes inline to isolate changes to the highlighted text selection only
const SizeStyle = Quill.import('attributors/style/size');
SizeStyle.whitelist = ['8px', '10px', '12px', '14px', '16px', '18px', '20px', '24px', '28px', '32px', '36px', '45px'];
Quill.register(SizeStyle, true);

const quill = new Quill('#editor', {
    theme: 'snow',
    modules: {
        toolbar: '#toolbar-container'
    }
});

const input = document.getElementById("tenglishInput");
const preview = document.getElementById("preview");
let lastRange = null;

// Track selection details accurately inside the canvas context
quill.on('selection-change', function(range) {
    if (range) {
        lastRange = range;
    }
});

function transliterate(text) {
    try {
        return Sanscript.t(text, "itrans_dravidian", "telugu");
    }
    catch (error) {
        console.error(error);
        return text;
    }
}

// Live text box transcription tracking logic
function updatePreview() {
    const value = input.value;
    if (value === '') {
        preview.innerText = '';
        return;
    }
    preview.innerText = transliterate(value);
}

input.addEventListener('input', updatePreview);

// Inject completed words into the document timeline on Enter keypress
input.addEventListener('keydown', function(e) {
    if (e.key !== 'Enter') return;
    e.preventDefault();

    const value = input.value;
    if (value === '') return;

    const telugu = transliterate(value);
    let insertIndex = lastRange ? lastRange.index : quill.getLength() - 1;

    quill.insertText(insertIndex, telugu + ' ');
    quill.setSelection(insertIndex + telugu.length + 1);

    lastRange = {
        index: insertIndex + telugu.length + 1,
        length: 0
    };

    input.value = '';
    preview.innerText = '';
    input.focus();
});

// Floating Keyboard Interface configuration
const keyboardBtn = document.getElementById("keyboardBtn");
const keyboard = document.getElementById("teluguKeyboard");
const closeKeyboard = document.getElementById("closeKeyboard");

keyboardBtn.onclick = () => { keyboard.style.display = "block"; };
closeKeyboard.onclick = () => { keyboard.style.display = "none"; };

const layouts = {
    vowels: ["అ","ఆ","ఇ","ఈ","ఉ","ఊ","ఋ","ౠ","ఎ","ఏ","ఐ","ఒ","ఓ","ఔ","అం","అః"],
    consonants: ["క","ఖ","గ","ఘ","ఙ","చ","ఛ","జ","ఝ","ఞ","ట","ఠ","డ","ఢ","ణ","త","థ","ద","ధ","న","ప","ఫ","బ","భ","మ","య","ర","ల","వ","శ","ష","స","హ","ళ","ఱ","క్ష","జ్ఞ"],
    guninthalu: ["ా","ి","ీ","ు","ూ","ృ","ౄ","ె","ే","ై","\u0c4b","ో","ౌ","్","ం","ః"],
    otthulu: ["్క", "్ఖ", "్గ", "్ఘ", "్ఙ", "్చ", "్ఛ", "్జ", "్ఝ", "ఞ", "్ట", "్ఠ", "్డ", "్ఢ", "్ణ", "్త", "్థ", "్ద", "్ధ", "్న", "్ప", "్ఫ", "్బ", "్భ", "్మ", "్య", "్ర", "్ల", "్వ", "్శ", "్ష", "్స", "్హ", "్ళ", "్ఱ", "్క్ష", "్జ్ఞ"],
    numbers: ["౦","౧","౨","౩","౪","౫","౬","౭","౮","౯"],
    symbols: ["।","॥",",",".","?","!",":",";","(",")","[","]","{","}","-","—","'","\"","/","\\"]
};

const keysContainer = document.getElementById("keyboardKeys");

function loadLayout(layout) {
    keysContainer.innerHTML = "";
    layouts[layout].forEach(char => {
        const btn = document.createElement("button");
        btn.className = "key";
        btn.innerText = char;

        btn.onclick = () => {
            // Check if the user is currently interacting with the bottom input box
            if (document.activeElement === input) {
                const startPos = input.selectionStart;
                const endPos = input.selectionEnd;
                input.value = input.value.substring(0, startPos) + char + input.value.substring(endPos);
                input.selectionStart = input.selectionEnd = startPos + char.length;
                input.focus();
                updatePreview();
            } else {
                // Otherwise, insert characters directly into the main editor interface at your current selection
                quill.focus();
                let range = quill.getSelection(true);
                quill.insertText(range.index, char);
                quill.setSelection(range.index + char.length);
                
                lastRange = {
                    index: range.index + char.length,
                    length: 0
                };
            }
        };
        keysContainer.appendChild(btn);
    });
}

document.querySelectorAll(".tabBtn").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".tabBtn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        loadLayout(btn.dataset.tab);
    });
});

document.querySelector('.tabBtn[data-tab="vowels"]').classList.add("active");
loadLayout("vowels");