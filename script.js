// 設置鼠標拖尾效果
document.addEventListener('mousemove', (e) => {
    const tail = document.createElement('div');
    tail.classList.add('mouse-tail');
    tail.style.width = '20px';
    tail.style.height = '20px';
    tail.style.left = `${e.clientX}px`;
    tail.style.top = `${e.clientY}px`;
    document.body.appendChild(tail);

    setTimeout(() => {
        tail.remove();
    }, 500);
});

// 背景顏色切換
document.getElementById('endless').addEventListener('mouseover', () => {
    document.body.style.background = 'linear-gradient(135deg, #92fe9d, #00c9ff)';
});

document.getElementById('endless').addEventListener('mouseout', () => {
    document.body.style.background = 'linear-gradient(135deg, #a6c0fe, #f68084)';
});

document.getElementById('timed').addEventListener('mouseover', () => {
    document.body.style.background = 'linear-gradient(135deg, #b721ff, #21d4fd)';
});

document.getElementById('timed').addEventListener('mouseout', () => {
    document.body.style.background = 'linear-gradient(135deg, #a6c0fe, #f68084)';
});
