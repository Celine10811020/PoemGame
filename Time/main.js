let verseArray = [];
let skipWord = [];
let poems = [];
var term;
var challengeWord;
var remainTime;
var skipTime;
var totalGameTime;

function showRule()
{
  document.getElementById('Rule').style.display = 'flex';
}

function startGame()
{
  document.getElementById('Rule').style.display = 'none';
  document.querySelector('.container').style.display = 'block';
  document.getElementById('StartInput').style.display = 'block';
  document.getElementById('Challenge').style.display = 'none';
  document.getElementById('Result').style.display = 'none';
}

function start()
{
  const initialVerse = document.getElementById('StartVerse').value.trim();

  if(initialVerse)
  {
    let poemExists = false;
    for(let poem of poems)
    {
      if (poem.content.includes(initialVerse))
      {
        poemExists = true;
        break;
      }
    }

    if(!poemExists)
    {
      alert('詩詞不存在於資料庫中。');
      return;
    }

    verseArray.push(initialVerse);

    for(let word of initialVerse)
    {
      skipWord.push(word);
    }

    term = 0;
    challengeWord = 0;
    remainTime = 600;
    skipTime = 15;
    totalGameTime = 600;

    document.getElementById('StartInput').style.display = 'none';
    document.getElementById('Challenge').style.display = 'block';
    document.getElementById('Result').style.display = 'block';
    document.getElementById('VerseList').innerHTML += `<li>${initialVerse}</li>`;

    startTimer();
    updateChallenge();
    updateSkipTime();
  }else
  {
    alert('請先輸入一個有效的詩句！');
  }
}

function updateChallenge()
{
  const currentChallenge = verseArray[term];
  const challengeContainer = document.getElementById('ChallengeVerse');

  challengeContainer.innerHTML = '';

  for(let i=0; i<currentChallenge.length; i++) {
    const span = document.createElement('span');
    span.textContent = currentChallenge[i];
    challengeContainer.appendChild(span);
  }

  if(skipWord.length>0 && challengeWord<currentChallenge.length && currentChallenge[challengeWord]===skipWord[0] && term>0)
  {
    skipWord.shift();
    challengeWord++;
  }

  if(challengeWord >= currentChallenge.length)
  {
    challengeWord = 0;
    term++;

    updateChallenge();
    return;
  }

  const currentWordSpan = challengeContainer.children[challengeWord];
  const arrow = document.getElementById('Arrow');
  arrow.style.visibility = 'visible';

  const rect = currentWordSpan.getBoundingClientRect();
  arrow.style.position = 'absolute';
  arrow.style.left = rect.left + 5 + 'px';
  arrow.style.top = rect.top + 30 + 'px';
}

function checkAnswer()
{
  const playerInput = document.getElementById('Verse').value.trim();
  const repeat = verseArray.includes(playerInput)
  const currentWord = document.getElementById('ChallengeVerse').textContent[challengeWord];

  let poemExists = false;
  for(let poem of poems)
  {
    if (poem.content.includes(playerInput))
    {
      poemExists = true;
      break;
    }
  }


  if(repeat == true)
  {
    alert('請輸入與之前不重複的詩句！');
    return;
  }

  if(!playerInput)
  {
    alert('請輸入一個有效的詩句！');
    return;
  }

  if(!poemExists)
  {
    alert('詩詞不存在於資料庫中。');
    return;
  }

  if(!playerInput.includes(currentWord))
  {
    alert(`詩詞中必須包含「${currentWord}」字。`);
    return;
  }

  verseArray.push(playerInput);

  for(let word of playerInput)
  {
    skipWord.push(word);
  }

  document.getElementById('VerseList').innerHTML += `<li>${playerInput}</li>`;
  document.getElementById('Verse').value = '';

  if(challengeWord < document.getElementById('ChallengeVerse').textContent.length-1)
  {
    challengeWord++;
  }else
  {
    challengeWord = 0;
    term++;
  }

  remainTime += 30;
  updateTimer();
  updateChallenge();

  document.getElementById('Verse').focus();
}

function startTimer()
{
  const timerInterval = setInterval(() =>
  {
    remainTime--;
    updateTimer();
    updateTimerBar();

    if(remainTime <= 0)
    {
      clearInterval(timerInterval);

      const verseCount = verseArray.length - 1;
      alert(`時間到！遊戲結束！！\n你一共找到了 ${verseCount} 首詩句！`);
    }
  }, 1000);
}

function updateTimer()
{
  const minutes = Math.floor(remainTime / 60);
  const seconds = remainTime % 60;
  document.getElementById('TimerDisplay').textContent = `${minutes}分${seconds < 10 ? '0' : ''}${seconds}秒`;
}

function updateTimerBar()
{
    const timerBar = document.getElementById('TimerBar');
    const percentage = (remainTime / totalGameTime) * 100;
    timerBar.style.width = `${percentage}%`;
}

function skipWordHandler()
{
  if(remainTime <= 0)
  {
    alert('已無剩餘時間，無法跳過！');
    return;
  }

  remainTime -= skipTime;
  updateTimer();
  updateTimerBar();

  if (remainTime <= 0) {
    const verseCount = verseArray.length - 1;
    alert(`時間到！遊戲結束！！\n你一共找到了 ${verseCount} 首詩句！`);
    return;
  }

  if(challengeWord < document.getElementById('ChallengeVerse').textContent.length-1)
  {
    challengeWord++;
  }else{
    challengeWord = 0;
    term++;
  }

  skipTime *= 2;
  updateChallenge();
  updateSkipTime();
}

function updateSkipTime()
{
  document.getElementById('SkipTimeDisplay').textContent = `跳過將扣除${skipTime}秒`;
}

fetch('poem.json')
  .then(response => response.json())
  .then(data => {
    poems = data;
  })
  .catch(error => console.error('Error loading JSON:', error));

document.getElementById('StartVerse').addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    start();
  }
});

document.getElementById('Verse').addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    checkAnswer();
  }
});

document.getElementById('SkipButton').addEventListener('click', skipWordHandler);
document.getElementById('Verse').addEventListener('keydown', function(event) {
  if (event.shiftKey && event.key === 'Enter') {
    event.preventDefault();
    skipWordHandler();
  }
});

window.onload = showRule;
