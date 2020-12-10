import { playChords } from './chords.js';
import { scales } from './scales.js';
import { allNotes } from './notes.js';

const synth = new Tone.Synth().toDestination();
const synthA = new Tone.FMSynth().toDestination();
const synthB = new Tone.AMSynth().toDestination();
const sampler = new Tone.Sampler({
  urls: {
    C4: 'C4.mp3',
    'D#4': 'Ds4.mp3',
    'F#4': 'Fs4.mp3',
    A4: 'A4.mp3'
  },
  release: 1,
  baseUrl: 'https://tonejs.github.io/audio/salamander/'
}).toDestination();
let sound = sampler;
let duration = '6n';
let keyDur = 500;
const now = Tone.now();

const whiteNotes = document.querySelectorAll('.white');
const blackNotes = document.querySelectorAll('.black');
const chordsSelect = document.getElementById('chords');
const scaleSelect = document.getElementById('scales');

const soundSelect = document.querySelector('.sound-select');
const durationSelect = document.querySelector('.duration-select');
const showNote = document.getElementById('show-note');

// SETTINGS

soundSelect.addEventListener('change', e => {
  switch (e.target.value) {
    case 'piano':
      sound = sampler;
      break;
    case 'synth':
      sound = synth;
      break;
    case 'voilin':
      sound = synthA;
      break;
    case 'synth-alt':
      sound = synthB;
      break;
    default:
      sound = piano;
  }
});

durationSelect.addEventListener('change', e => {
  switch (e.target.value) {
    case '1':
      duration = '2n';
      keyDur = 1000;
      break;
    case '2':
      duration = '1n';
      keyDur = 2000;
      break;
    case '25':
      duration = '4n';
      keyDur = 750;
      break;
    case '50':
      duration = '6n';
      keyDur = 500;
      break;
    case '75':
      duration = '8n';
      keyDur = 250;
      break;
    case '100':
      duration = '16n';
      keyDur = 150;
      break;
    default:
      duration = '6n';
  }
});

// SHOW NOTE FUNCTION
function displayNote(note) {
  showNote.style.display = 'block';
  showNote.innerText = note;
}

// PLAY NOTES FUNTIONALITY

whiteNotes.forEach(wn => {
  wn.addEventListener('mouseover', async e => {
    e.target.style.borderTopColor = 'grey';
  });
  wn.addEventListener('mouseout', e => {
    e.target.style.borderTopColor = 'white';
  });

  wn.addEventListener('click', async e => {
    let note = e.target.id.toUpperCase();
    await Tone.start();
    sound.triggerAttackRelease(note, duration);
    displayNote(note[0]);
  });
});

blackNotes.forEach(bn => {
  bn.addEventListener('mouseover', async e => {
    e.target.style.borderTopColor = 'rgb(52, 52, 52)';
  });
  bn.addEventListener('mouseout', e => {
    e.target.style.borderTopColor = 'white';
  });

  bn.addEventListener('click', async e => {
    let note = e.target.id.toUpperCase();
    await Tone.start();
    sound.triggerAttackRelease(note, duration);
    displayNote(note.slice(0, 2));
  });
});

// CHORD FUNCTIONALITY
chordsSelect.addEventListener('change', async e => {
  showNote.style.display = 'none';
  await Tone.start();
  let notes = [];
  let highlight = [];
  playChords.map(i => {
    if (i[e.target.value]) {
      i[e.target.value].map(n => {
        notes.push(n);
        allNotes.map(i => {
          n.toLowerCase() === i ? highlight.push(i) : null;
        });
      });
    }
  });
  highlight.map(i => {
    document.getElementById(i).style.background = 'rgb(255, 214, 138)';
    document.getElementById(i).style.borderTopColor = 'rgb(52, 52, 52)';
  });
  sound.triggerAttackRelease(notes[0], duration);
  setTimeout(() => {
    sound.triggerAttackRelease(notes[1], duration);
  }, 100);
  setTimeout(() => {
    sound.triggerAttackRelease(notes[2], duration);
  }, 200);
  setTimeout(() => {
    highlight.map(i => {
      i.length === 2
        ? (document.getElementById(i).style.background = 'white')
        : (document.getElementById(i).style.background = 'black');
      document.getElementById(i).style.borderTopColor = 'white';
    });
  }, 600);
});

// SCALE FUNCTIONALITY

scaleSelect.addEventListener('change', async e => {
  await Tone.start();
  let notes = [];
  let highlight = [];
  scales.map(i => {
    if (i[e.target.value]) {
      i[e.target.value].map(n => {
        notes.push(n);
        allNotes.map(i => {
          n.toLowerCase() === i ? highlight.push(i) : null;
        });
      });
    }
  });
  sound.triggerAttackRelease(notes[0], duration);
  document.getElementById(highlight[0]).style.background = 'rgb(255, 214, 138)';
  document.getElementById(highlight[0]).style.borderTopColor =
    'rgb(52, 52, 52)';

  setTimeout(() => {
    sound.triggerAttackRelease(notes[1], duration);
    if (highlight[0].length === 2) {
      document.getElementById(highlight[0]).style.background = 'white';
      displayNote(highlight[0][0].toUpperCase());
    } else {
      document.getElementById(highlight[0]).style.background = 'black';
      displayNote(highlight[0].slice(0, 2).toUpperCase());
    }
    document.getElementById(highlight[0]).style.borderTopColor = 'white';
    document.getElementById(highlight[1]).style.background =
      'rgb(255, 214, 138)';
    document.getElementById(highlight[1]).style.borderTopColor =
      'rgb(52, 52, 52)';
    document.getElementById(highlight[0]).style.borderTopColor = 'white';
  }, 200);
  setTimeout(() => {
    sound.triggerAttackRelease(notes[2], duration);
    if (highlight[1].length === 2) {
      document.getElementById(highlight[1]).style.background = 'white';
      displayNote(highlight[1][0].toUpperCase());
    } else {
      document.getElementById(highlight[1]).style.background = 'black';
      displayNote(highlight[1].slice(0, 2).toUpperCase());
    }
    document.getElementById(highlight[2]).style.background =
      'rgb(255, 214, 138)';
    document.getElementById(highlight[2]).style.borderTopColor =
      'rgb(52, 52, 52)';
    document.getElementById(highlight[1]).style.borderTopColor = 'white';
  }, 400);
  setTimeout(() => {
    sound.triggerAttackRelease(notes[3], duration);
    if (highlight[2].length === 2) {
      document.getElementById(highlight[2]).style.background = 'white';
      displayNote(highlight[2][0].toUpperCase());
    } else {
      document.getElementById(highlight[2]).style.background = 'black';
      displayNote(highlight[2].slice(0, 2).toUpperCase());
    }
    document.getElementById(highlight[3]).style.background =
      'rgb(255, 214, 138)';
    document.getElementById(highlight[3]).style.borderTopColor =
      'rgb(52, 52, 52)';
    document.getElementById(highlight[2]).style.borderTopColor = 'white';
  }, 600);
  setTimeout(() => {
    console.log(notes[4]);
    sound.triggerAttackRelease(notes[4], duration);
    if (highlight[3].length === 2) {
      document.getElementById(highlight[3]).style.background = 'white';
      displayNote(highlight[3][0].toUpperCase());
    } else {
      document.getElementById(highlight[3]).style.background = 'black';
      displayNote(highlight[3].slice(0, 2).toUpperCase());
    }
    document.getElementById(highlight[4]).style.background =
      'rgb(255, 214, 138)';
    document.getElementById(highlight[4]).style.borderTopColor =
      'rgb(52, 52, 52)';
    document.getElementById(highlight[3]).style.borderTopColor = 'white';
  }, 800);
  setTimeout(() => {
    sound.triggerAttackRelease(notes[5], duration);
    if (highlight[4].length === 2) {
      document.getElementById(highlight[4]).style.background = 'white';
      displayNote(highlight[4][0].toUpperCase());
    } else {
      document.getElementById(highlight[4]).style.background = 'black';
      displayNote(highlight[4].slice(0, 2).toUpperCase());
    }
    document.getElementById(highlight[5]).style.background =
      'rgb(255, 214, 138)';
    document.getElementById(highlight[5]).style.borderTopColor =
      'rgb(52, 52, 52)';
    document.getElementById(highlight[4]).style.borderTopColor = 'white';
  }, 1000);
  setTimeout(() => {
    sound.triggerAttackRelease(notes[6], duration);
    if (highlight[5].length === 2) {
      document.getElementById(highlight[5]).style.background = 'white';
      displayNote(highlight[5][0].toUpperCase());
    } else {
      document.getElementById(highlight[5]).style.background = 'black';
      displayNote(highlight[5].slice(0, 2).toUpperCase());
    }
    document.getElementById(highlight[6]).style.background =
      'rgb(255, 214, 138)';
    document.getElementById(highlight[6]).style.borderTopColor =
      'rgb(52, 52, 52)';
    document.getElementById(highlight[5]).style.borderTopColor = 'white';
  }, 1200);
  setTimeout(() => {
    sound.triggerAttackRelease(notes[7], duration);
    if (highlight[6].length === 2) {
      document.getElementById(highlight[6]).style.background = 'white';
      displayNote(highlight[6][0].toUpperCase());
    } else {
      document.getElementById(highlight[6]).style.background = 'black';
      displayNote(highlight[6].slice(0, 2).toUpperCase());
    }
    document.getElementById(highlight[7]).style.background =
      'rgb(255, 214, 138)';
    document.getElementById(highlight[7]).style.borderTopColor =
      'rgb(52, 52, 52)';
    document.getElementById(highlight[6]).style.borderTopColor = 'white';
  }, 1400);
  setTimeout(() => {
    if (highlight[7].length === 2) {
      document.getElementById(highlight[7]).style.background = 'white';
      displayNote(highlight[7][0].toUpperCase());
    } else {
      document.getElementById(highlight[7]).style.background = 'black';
      displayNote(highlight[7].slice(0, 2).toUpperCase());
    }
    document.getElementById(highlight[7]).style.borderTopColor = 'white';
  }, 1600);
});

// KEYDOWN NOTE FUNCTIONALITY
window.addEventListener('keydown', async e => {
  await Tone.start();
  whiteNotes.forEach(i => {
    i.style.background = 'white';
  });
  blackNotes.forEach(i => {
    i.style.background = 'black';
  });
  fetch('keyCodes.json')
    .then(response => response.json())
    .then(data => {
      sound.triggerAttackRelease(data[e.keyCode], duration);
      whiteNotes.forEach(i => {
        if (i.id.toUpperCase() === data[e.keyCode]) {
          i.style.background = 'rgb(255, 214, 138)';
          i.style.borderTopColor = 'rgb(52, 52, 52)';
          console.log(data[e.keyCode]);
          displayNote(data[e.keyCode][0]);
        }
      });
      blackNotes.forEach(i => {
        if (i.id.toUpperCase() === data[e.keyCode]) {
          i.style.background = 'rgb(255, 214, 138)';
          i.style.borderTopColor = 'rgb(52, 52, 52)';
          displayNote(data[e.keyCode].slice(0, 2));
        }
      });
    });
});

window.addEventListener('keyup', e => {
  fetch('keyCodes.json')
    .then(response => response.json())
    .then(data => {
      whiteNotes.forEach(i => {
        if (i.id.toUpperCase() === data[e.keyCode]) {
          i.style.background = 'white';
          i.style.borderTopColor = 'white';
        }
      });
      blackNotes.forEach(i => {
        if (i.id.toUpperCase() === data[e.keyCode]) {
          i.style.background = 'black';
          i.style.borderTopColor = 'white';
        }
      });
    });
});

// ERROR OCCURS ON TOP ROW KEY DOWN WHEN ISNT BLACK NOTE
