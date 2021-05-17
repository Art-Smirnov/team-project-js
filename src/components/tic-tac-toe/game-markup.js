export default function gameMarkup() {
  return `<li class="game-wrapper">
    <div class="game__title-wrapper">     
   <h2 class="no-results__title">Sorry, there're no events.</h2>
   <p class="no-results__description">But keep calm and play tic-tac-toe👇</p>
    </div>
     <div class="game">
         <form>
           <div class="board">
             <svg class="board__line" style="--x: 1; --y: 0">
               <path d="M 5 5 L 295 5" fill="none" stroke-width="10" stroke-linecap="round" stroke-dasharray="300" stroke-dashoffset="300"></path>
             </svg>
             <svg class="board__line" style="--x: 2; --y: 0">
               <path d="M 5 5 L 295 5" fill="none" stroke-width="10" stroke-linecap="round" stroke-dasharray="300" stroke-dashoffset="300"></path>
             </svg>
             <svg class="board__line" style="--x: 0; --y: 1">
               <path d="M 5 5 L 295 5" fill="none" stroke-width="10" stroke-linecap="round" stroke-dasharray="300" stroke-dashoffset="300"></path>
             </svg>
             <svg class="board__line" style="--x: 0; --y: 2">
               <path d="M 5 5 L 295 5" fill="none" stroke-width="10" stroke-linecap="round" stroke-dasharray="300" stroke-dashoffset="300"></path>
             </svg>
             <input type="checkbox" id="x--0" style="--col: 0; --row: 0"/><span style="--col: 0; --row: 0">
               <svg class="x">
                 <path class="cross" d="M 20 20 L 80 80" fill="none" stroke-width="10" stroke-linecap="round" stroke-dasharray="100" stroke-dashoffset="100"></path>
                 <path class="cross" d="M 80 20 L 20 80" fill="none" stroke-width="10" stroke-linecap="round" stroke-dasharray="100" stroke-dashoffset="100"></path>
               </svg></span>
             <input type="checkbox" id="o--0" style="--col: 0; --row: 0"/><span style="--col: 0; --row: 0">
               <svg class="o">
                 <circle class="naught" cx="50" cy="50" r="30" fill="none" stroke-width="10" stroke-dasharray="200" stroke-dashoffset="200" stroke-linecap="round"></circle>
               </svg></span>
             <input type="checkbox" id="x--1" style="--col: 1; --row: 0"/><span style="--col: 1; --row: 0">
               <svg class="x">
                 <path class="cross" d="M 20 20 L 80 80" fill="none" stroke-width="10" stroke-linecap="round" stroke-dasharray="100" stroke-dashoffset="100"></path>
                 <path class="cross" d="M 80 20 L 20 80" fill="none" stroke-width="10" stroke-linecap="round" stroke-dasharray="100" stroke-dashoffset="100"></path>
               </svg></span>
             <input type="checkbox" id="o--1" style="--col: 1; --row: 0"/><span style="--col: 1; --row: 0">
               <svg class="o">
                 <circle class="naught" cx="50" cy="50" r="30" fill="none" stroke-width="10" stroke-dasharray="200" stroke-dashoffset="200" stroke-linecap="round"></circle>
               </svg></span>
             <input type="checkbox" id="x--2" style="--col: 2; --row: 0"/><span style="--col: 2; --row: 0">
               <svg class="x">
                 <path class="cross" d="M 20 20 L 80 80" fill="none" stroke-width="10" stroke-linecap="round" stroke-dasharray="100" stroke-dashoffset="100"></path>
                 <path class="cross" d="M 80 20 L 20 80" fill="none" stroke-width="10" stroke-linecap="round" stroke-dasharray="100" stroke-dashoffset="100"></path>
               </svg></span>
             <input type="checkbox" id="o--2" style="--col: 2; --row: 0"/><span style="--col: 2; --row: 0">
               <svg class="o">
                 <circle class="naught" cx="50" cy="50" r="30" fill="none" stroke-width="10" stroke-dasharray="200" stroke-dashoffset="200" stroke-linecap="round"></circle>
               </svg></span>
             <input type="checkbox" id="x--3" style="--col: 0; --row: 1"/><span style="--col: 0; --row: 1">
               <svg class="x">
                 <path class="cross" d="M 20 20 L 80 80" fill="none" stroke-width="10" stroke-linecap="round" stroke-dasharray="100" stroke-dashoffset="100"></path>
                 <path class="cross" d="M 80 20 L 20 80" fill="none" stroke-width="10" stroke-linecap="round" stroke-dasharray="100" stroke-dashoffset="100"></path>
               </svg></span>
             <input type="checkbox" id="o--3" style="--col: 0; --row: 1"/><span style="--col: 0; --row: 1">
               <svg class="o">
                 <circle class="naught" cx="50" cy="50" r="30" fill="none" stroke-width="10" stroke-dasharray="200" stroke-dashoffset="200" stroke-linecap="round"></circle>
               </svg></span>
             <input type="checkbox" id="x--4" style="--col: 1; --row: 1"/><span style="--col: 1; --row: 1">
               <svg class="x">
                 <path class="cross" d="M 20 20 L 80 80" fill="none" stroke-width="10" stroke-linecap="round" stroke-dasharray="100" stroke-dashoffset="100"></path>
                 <path class="cross" d="M 80 20 L 20 80" fill="none" stroke-width="10" stroke-linecap="round" stroke-dasharray="100" stroke-dashoffset="100"></path>
               </svg></span>
             <input type="checkbox" id="o--4" style="--col: 1; --row: 1"/><span style="--col: 1; --row: 1">
               <svg class="o">
                 <circle class="naught" cx="50" cy="50" r="30" fill="none" stroke-width="10" stroke-dasharray="200" stroke-dashoffset="200" stroke-linecap="round"></circle>
               </svg></span>
             <input type="checkbox" id="x--5" style="--col: 2; --row: 1"/><span style="--col: 2; --row: 1">
               <svg class="x">
                 <path class="cross" d="M 20 20 L 80 80" fill="none" stroke-width="10" stroke-linecap="round" stroke-dasharray="100" stroke-dashoffset="100"></path>
                 <path class="cross" d="M 80 20 L 20 80" fill="none" stroke-width="10" stroke-linecap="round" stroke-dasharray="100" stroke-dashoffset="100"></path>
               </svg></span>
             <input type="checkbox" id="o--5" style="--col: 2; --row: 1"/><span style="--col: 2; --row: 1">
               <svg class="o">
                 <circle class="naught" cx="50" cy="50" r="30" fill="none" stroke-width="10" stroke-dasharray="200" stroke-dashoffset="200" stroke-linecap="round"></circle>
               </svg></span>
             <input type="checkbox" id="x--6" style="--col: 0; --row: 2"/><span style="--col: 0; --row: 2">
               <svg class="x">
                 <path class="cross" d="M 20 20 L 80 80" fill="none" stroke-width="10" stroke-linecap="round" stroke-dasharray="100" stroke-dashoffset="100"></path>
                 <path class="cross" d="M 80 20 L 20 80" fill="none" stroke-width="10" stroke-linecap="round" stroke-dasharray="100" stroke-dashoffset="100"></path>
               </svg></span>
             <input type="checkbox" id="o--6" style="--col: 0; --row: 2"/><span style="--col: 0; --row: 2">
               <svg class="o">
                 <circle class="naught" cx="50" cy="50" r="30" fill="none" stroke-width="10" stroke-dasharray="200" stroke-dashoffset="200" stroke-linecap="round"></circle>
               </svg></span>
             <input type="checkbox" id="x--7" style="--col: 1; --row: 2"/><span style="--col: 1; --row: 2">
               <svg class="x">
                 <path class="cross" d="M 20 20 L 80 80" fill="none" stroke-width="10" stroke-linecap="round" stroke-dasharray="100" stroke-dashoffset="100"></path>
                 <path class="cross" d="M 80 20 L 20 80" fill="none" stroke-width="10" stroke-linecap="round" stroke-dasharray="100" stroke-dashoffset="100"></path>
               </svg></span>
             <input type="checkbox" id="o--7" style="--col: 1; --row: 2"/><span style="--col: 1; --row: 2">
               <svg class="o">
                 <circle class="naught" cx="50" cy="50" r="30" fill="none" stroke-width="10" stroke-dasharray="200" stroke-dashoffset="200" stroke-linecap="round"></circle>
               </svg></span>
             <input type="checkbox" id="x--8" style="--col: 2; --row: 2"/><span style="--col: 2; --row: 2">
               <svg class="x">
                 <path class="cross" d="M 20 20 L 80 80" fill="none" stroke-width="10" stroke-linecap="round" stroke-dasharray="100" stroke-dashoffset="100"></path>
                 <path class="cross" d="M 80 20 L 20 80" fill="none" stroke-width="10" stroke-linecap="round" stroke-dasharray="100" stroke-dashoffset="100"></path>
               </svg></span>
             <input type="checkbox" id="o--8" style="--col: 2; --row: 2"/><span style="--col: 2; --row: 2">
               <svg class="o">
                 <circle class="naught" cx="50" cy="50" r="30" fill="none" stroke-width="10" stroke-dasharray="200" stroke-dashoffset="200" stroke-linecap="round"></circle>
               </svg></span>
             <label for="x--0" style="--col: 0; --row: 0"></label>
             <label for="o--0" style="--col: 0; --row: 0"></label>
             <label for="x--1" style="--col: 1; --row: 0"></label>
             <label for="o--1" style="--col: 1; --row: 0"></label>
             <label for="x--2" style="--col: 2; --row: 0"></label>
             <label for="o--2" style="--col: 2; --row: 0"></label>
             <label for="x--3" style="--col: 0; --row: 1"></label>
             <label for="o--3" style="--col: 0; --row: 1"></label>
             <label for="x--4" style="--col: 1; --row: 1"></label>
             <label for="o--4" style="--col: 1; --row: 1"></label>
             <label for="x--5" style="--col: 2; --row: 1"></label>
             <label for="o--5" style="--col: 2; --row: 1"></label>
             <label for="x--6" style="--col: 0; --row: 2"></label>
             <label for="o--6" style="--col: 0; --row: 2"></label>
             <label for="x--7" style="--col: 1; --row: 2"></label>
             <label for="o--7" style="--col: 1; --row: 2"></label>
             <label for="x--8" style="--col: 2; --row: 2"></label>
             <label for="o--8" style="--col: 2; --row: 2"></label>
             <div class="board__result board__result--x result">
               <dl class="result__content">
                 <dt class="result__title">Winner!</dt>
                 <dd class="result__details">
                   <svg class="x result__icon">
                     <path class="cross" d="M 20 20 L 80 80" fill="none" stroke-width="10" stroke-linecap="round" stroke-dasharray="100" stroke-dashoffset="100"></path>
                     <path class="cross" d="M 80 20 L 20 80" fill="none" stroke-width="10" stroke-linecap="round" stroke-dasharray="100" stroke-dashoffset="100"></path>
                   </svg>
                 </dd>
                 <button class="result__reset" type="reset">Play again</button>
               </dl>
               <div class="result__firework-icon" style="--y: 449; --r: 323">🎉</div>
               <div class="result__firework-icon" style="--y: 319; --r: 318">🎉</div>
               <div class="result__firework-icon" style="--y: 461; --r: 288">🎉</div>
               <div class="result__firework-icon" style="--y: 418; --r: 305">🎉</div>
               <div class="result__firework-icon" style="--y: 346; --r: 154">🎉</div>
               <div class="result__firework-icon" style="--y: 461; --r: 198">🎉</div>
               <div class="result__firework-icon" style="--y: 476; --r: 3">🎉</div>
               <div class="result__firework-icon" style="--y: 488; --r: 354">🎉</div>
               <div class="result__firework-icon" style="--y: 386; --r: 191">🎉</div>
               <div class="result__firework-icon" style="--y: 418; --r: 153">🎉</div>
               <div class="result__firework-icon" style="--y: 250; --r: 226">🎉</div>
               <div class="result__firework-icon" style="--y: 236; --r: 315">🎉</div>
               <div class="result__firework-icon" style="--y: 218; --r: 297">🎉</div>
               <div class="result__firework-icon" style="--y: 411; --r: 321">🎉</div>
               <div class="result__firework-icon" style="--y: 401; --r: 251">🎉</div>
               <div class="result__firework-icon" style="--y: 447; --r: 187">🎉</div>
               <div class="result__firework-icon" style="--y: 372; --r: 295">🎉</div>
               <div class="result__firework-icon" style="--y: 326; --r: 94">🎉</div>
               <div class="result__firework-icon" style="--y: 205; --r: 211">🎉</div>
               <div class="result__firework-icon" style="--y: 372; --r: 50">🎉</div>
               <div class="result__firework-icon" style="--y: 424; --r: 230">🎉</div>
               <div class="result__firework-icon" style="--y: 426; --r: 162">🎉</div>
               <div class="result__firework-icon" style="--y: 317; --r: 67">🎉</div>
               <div class="result__firework-icon" style="--y: 343; --r: 121">🎉</div>
               <div class="result__firework-icon" style="--y: 245; --r: 250">🎉</div>
               <div class="result__firework-icon" style="--y: 236; --r: 225">🎉</div>
               <div class="result__firework-icon" style="--y: 477; --r: 6">🎉</div>
               <div class="result__firework-icon" style="--y: 389; --r: 164">🎉</div>
               <div class="result__firework-icon" style="--y: 203; --r: 188">🎉</div>
               <div class="result__firework-icon" style="--y: 453; --r: 61">🎉</div>
             </div>
             <div class="board__result board__result--o result">
               <dl class="result__content">
                 <dt class="result__title">Winner!</dt>
                 <dd class="result__details">
                   <svg class="o result__icon">
                     <circle class="naught" cx="50" cy="50" r="30" fill="none" stroke-width="10" stroke-dasharray="200" stroke-dashoffset="200" stroke-linecap="round"></circle>
                   </svg>
                 </dd>
                 <button class="result__reset" type="reset">Play again</button>
               </dl>
               <div class="result__firework-icon" style="--y: 356; --r: 330">🎉</div>
               <div class="result__firework-icon" style="--y: 472; --r: 277">🎉</div>
               <div class="result__firework-icon" style="--y: 397; --r: 118">🎉</div>
               <div class="result__firework-icon" style="--y: 330; --r: 240">🎉</div>
               <div class="result__firework-icon" style="--y: 227; --r: 338">🎉</div>
               <div class="result__firework-icon" style="--y: 423; --r: 200">🎉</div>
               <div class="result__firework-icon" style="--y: 432; --r: 157">🎉</div>
               <div class="result__firework-icon" style="--y: 497; --r: 221">🎉</div>
               <div class="result__firework-icon" style="--y: 370; --r: 193">🎉</div>
               <div class="result__firework-icon" style="--y: 246; --r: 32">🎉</div>
               <div class="result__firework-icon" style="--y: 294; --r: 18">🎉</div>
               <div class="result__firework-icon" style="--y: 483; --r: 287">🎉</div>
               <div class="result__firework-icon" style="--y: 433; --r: 4">🎉</div>
               <div class="result__firework-icon" style="--y: 279; --r: 52">🎉</div>
               <div class="result__firework-icon" style="--y: 309; --r: 312">🎉</div>
               <div class="result__firework-icon" style="--y: 316; --r: 176">🎉</div>
               <div class="result__firework-icon" style="--y: 273; --r: 223">🎉</div>
               <div class="result__firework-icon" style="--y: 416; --r: 158">🎉</div>
               <div class="result__firework-icon" style="--y: 472; --r: 165">🎉</div>
               <div class="result__firework-icon" style="--y: 230; --r: 272">🎉</div>
               <div class="result__firework-icon" style="--y: 471; --r: 165">🎉</div>
               <div class="result__firework-icon" style="--y: 474; --r: 293">🎉</div>
               <div class="result__firework-icon" style="--y: 403; --r: 229">🎉</div>
               <div class="result__firework-icon" style="--y: 396; --r: 100">🎉</div>
               <div class="result__firework-icon" style="--y: 454; --r: 221">🎉</div>
               <div class="result__firework-icon" style="--y: 245; --r: 321">🎉</div>
               <div class="result__firework-icon" style="--y: 254; --r: 108">🎉</div>
               <div class="result__firework-icon" style="--y: 303; --r: 128">🎉</div>
               <div class="result__firework-icon" style="--y: 322; --r: 236">🎉</div>
               <div class="result__firework-icon" style="--y: 440; --r: 7">🎉</div>
             </div>
             <div class="board__result board__result--draw">
               <dl class="result__content">
                 <dt class="result__title">Draw!</dt>
                 <dd class="result__details">
                   <div class="result__emoji">😭</div>
                 </dd>
                 <button class="result__reset" type="reset">Play again</button>
               </dl>
             </div>
           </div>
         </form>
       </div>
     </li>`;
}
