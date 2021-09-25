export const copyText = async (text: string): Promise<void> => {
    const paragraph = document.createElement('p');
    paragraph.innerHTML = text;
    paragraph.style.opacity = '0';
    paragraph.style.fontSize = '0';
    document.body.insertAdjacentElement('beforeend', paragraph);

    try {
        const selection = window.getSelection();
        const range = document.createRange();

        range.selectNodeContents(paragraph);
        selection?.removeAllRanges();
        selection?.addRange(range);

        document.execCommand('copy');
        selection?.removeAllRanges();
    } catch (e) {
        throw new Error();
    } finally {
        paragraph.remove();
    }
};
