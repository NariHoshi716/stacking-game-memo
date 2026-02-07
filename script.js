// ゲームデータを保持する配列
// 各要素は { title, consoleName, memo } の形のオブジェクト
let games = [];

// ------------------------
// 初期化処理
// ------------------------

// ページ読み込み時の初期化処理
// 保存されているゲーム情報を読み込み、画面に表示する
window.onload = function () {
  loadGames(); // localStorage からデータを復元
  renderGames(); // 復元したデータを表として表示
};


// ------------------------
// LocalStorage 関係の処理
// ------------------------

// Local Storage からゲーム内容の配列を読み込む
function loadGames() {
  const saved = localStorage.getItem("games");
  if (saved) {
    games = JSON.parse(saved);
  }
}

// ゲーム内容の保存
function saveGames() {
  localStorage.setItem("games", JSON.stringify(games));
}

// ------------------------
// 表示処理
// ------------------------

// ゲーム配列の内容を元に、表を描き直す関数
// 表示は必ずこの関数を通して行う
function renderGames() {
  const tbody = document.getElementById("game-list");
  tbody.innerHTML = ""; // 一旦空にする

  games.forEach((game, index) => {
    const tr = document.createElement("tr");

    // HTMLの表に追加する処理
    tr.innerHTML = `
      <td>${game.title}</td>
      <td>${game.consoleName}</td>
      <td>${game.memo}</td>
      <td>
        <button onclick="deleteGame(${index})">削除</button>
      </td>
    `;

    tbody.appendChild(tr);
  });
}

// ------------------------
// 追加と削除
// ------------------------

// 入力欄の内容を取得し、新しいゲームを配列に追加する
function addGame() {
  // 入力欄から値を取得
  const title = document.getElementById("title").value;
  const consoleName = document.getElementById("consoleName").value;
  const memo = document.getElementById("memo").value;

  if (title.trim() === "") return; // タイトルが空の際の入力不可処理

  // 配列にゲームタイトルを追加
  games.push({
    title,
    consoleName,
    memo
  });

    // 配列を更新したら、保存 → 再描画を行う
  saveGames();
  renderGames();

  document.getElementById("title").value = "";
  document.getElementById("consoleName").value = "";
  document.getElementById("memo").value = "";
}

// 指定したインデックスのゲームを削除する
function deleteGame(index) {
  // 配列から要素を削除
  games.splice(index, 1);
  saveGames();
  renderGames();
}


// ------------------------
// キー操作 Enterで入力
// ------------------------
function handleKey(event) {
  if (event.key === "Enter") {
    addGame();
  }
}

