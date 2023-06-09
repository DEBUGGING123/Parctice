onst player=1, dealer=1, none = 0;   //플레이어, 딜러
let player_card = [];   //플레이어 카드값 (배열로 존재해야 카드 값을 여러장 뽑았을 때 각각의 값을 저장가능)
let dealer_card;   //딜러 카드값
let winner;   //승자
let win, lose, draw = 0;    //승점
let deal, hit, stand = 0;   //플레이어의 선택 => 선택 활성화 됐을 경우 1로 값 변경하여 조건 만족
let card = ['A','2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];    //카드 배열
let standing = false;   //stand 버튼 눌렀을 떄 활성화
let turnEnd = false;    //딜러 턴이 끝났을 때 활성화

// standing == true && turnEnd == true 일 경우 승자 판별로 넘어가는 조건 만족

//Hit 버튼을 눌렀을 경우에 발생하는 이벤트 => 플레이어에게 카드 배분
document.querySelector('#hit_btn').addEventListener('click', Hit); 

//카드 값을 계산하기 위한 함수. A는 플레이어 카드 값에 따라 11과 1로 저장.
function calculatePlayerCardValue(cards) {
    let totalValue = 0;
    let aceCount = 0;
  
    for (let i = 0; i < cards.length; i++) {
      let cardValue;
      if (cards[i] === 'A') {
        cardValue = 11;
        aceCount++;
      } else if (cards[i] === 'J' || cards[i] === 'Q' || cards[i] === 'K') {
        cardValue = 10;
      } else {
        cardValue = parseInt(cards[i]);
      }
  
      totalValue += cardValue;
    }
  
    while (totalValue > 21 && aceCount > 0) {
      totalValue -= 10;
      aceCount--;
    }
  
    return totalValue;
  }
  
  function Hit() {
    if (!standing && !turnEnd) {
      // 플레이어의 카드 배열에 무작위 카드 추가
      const randomIndex = Math.floor(Math.random() * card.length);
      const randomCard = card[randomIndex];
      player_card.push(randomCard);
  
      // 플레이어의 카드 현황 콘솔에 출력
      console.log("플레이어 카드:", player_card);
  
      // 플레이어의 카드 총합 계산
      const totalValue = calculatePlayerCardValue(player_card);
      console.log("총점:", totalValue);
         
      // 플레이어의 카드 총합을 화면에 출력
      document.querySelector("#player_blackjack_point").textContent = totalValue;

  
      // 총합이 21을 초과하는지 확인
      if (totalValue > 21) {
        return totalValue;
      } else {
        // 플레이어에게 Hit 또는 Stand 선택 안내
        hit = 1;
        stand = 1;
    
      }
    }
  }
  

function Stand(){
    if (hit === 1) {
        standing = true;
        turnEnd = true;
        DealerTurn();
    }
}
