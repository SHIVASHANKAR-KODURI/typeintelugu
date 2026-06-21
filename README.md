# typeintelugu

A pure frontend, browser-based word processing editor that provides live "Tenglish" (English to Telugu) transliteration and formatting options.

## Features
- **Direct Canvas Transliteration**: Type standard phonetic English/Tenglish in the input area and hit `Enter` to seamlessly inject Telugu text at your exact cursor position.
- **Isolated Formatting Controls**: Change font sizing from 8px to 45px, toggle bold, italic, underline, or change alignments on only the text you select.
- **Visual Telugu Keyboard**: An on-screen floating keyboard to quickly insert vowels, consonants, numbers, symbols, and combining marks directly.
- **Pure Frontend Architecture**: No backend server or Node.js environment required. Runs entirely on the browser using client-side libraries.

## Built With
- **Quill API** - Core text editor system and rich text interface engine.
- **Sanscript.js** - Translates phonetic ITRANS input directly into standard Unicode Telugu characters locally on the browser.
- **Google Fonts** - Noto Sans Telugu typography stack integration.

## Project Structure
- `index.html` - The document view structure, toolbar interface components, and external script dependencies.
- `script.js` - Contains editor custom formatting registrations, live transliteration logic, layout mappings, and focus tracking.
- `style.css` - UI layout styles, editor canvas framing, floating interactive panel alignments, and virtual keyboard styles.

## How to Run Locally
1. Clone or download this project repository to your local directory.
2. Open the `index.html` file directly in any modern web browser (such as Chrome, Firefox, Safari, or Edge).
3. Start typing in the text box below the main document interface.

## Transliteration Cheat Sheet
This editor operates on the ITRANS standard format rules. Use these shifts for accurate phonetic output:
- **Sunna (ం)**: Use a capital **`M`** (e.g., typing `shaMkar` outputs **శంకర్**).
- **Retroflex Vowels/Consonants (ట, ఠ, డ, ఢ, ణ)**: Use uppercase letters like **`T`**, **`Th`**, **`D`**, **`Dh`**, or **`N`** (e.g., typing `telaMgaNa` outputs **తెలంగాణ**).
- **Long Vowels**: Use double letters (e.g., `a` = `అ`, while `aa` = `ఆ`).
