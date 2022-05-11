(function FriendLikes() {
  const { CosmosAsync, URI, SVGIcons } = Spicetify;
  const API_BASEURL = "https://guarded-meadow-30850.herokuapp.com";
  if (!(CosmosAsync && URI)) {
    setTimeout(FriendLikes, 300);
    return;
  }

  makeLikeButton();
  fetchAndDisplayNewLikes();
  setInterval(fetchAndDisplayNewLikes, 10000);

  function fetchAndDisplayNewLikes() {
    Spicetify.Platform.UserAPI.getUser().then((res) => {
      fetch(`${API_BASEURL}/api/friendlikes/${res.username}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((apiResponse) => {
          return apiResponse.json();
        })
        .then((data) => {
          for (const like of data) {
            makeLikeNotification(like);
          }
        });
    });
  }

  function doPost(body) {
    const randomId = Math.floor(Math.random() * Math.floor(10000000000));
    Spicetify.Platform.UserAPI.getUser().then((res) => {
      const fullBody = {
        id: randomId,
        timestamp: new Date().toISOString(),
        send_to_user_id: body.send_to_user_id,
        liked_by_user_id: res.username,
        liked_by_user_name: res.displayName,
        track_name: body.track_name,
        artist_name: body.artist_name,
        track_uri: body.track_uri,
        artist_uri: body.artist_uri,
      };

      fetch(`${API_BASEURL}/api/friendlikes`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fullBody),
      });
    });
  }

  function makeLikeButton() {
    const feed = document.querySelector('[aria-label="Friend Activity"]');
    if (!feed) {
      setTimeout(makeLikeButton, 100);
      return;
    }

    const cards = document.querySelectorAll(".gj9SOnCIzruGWAM5m3XO:not(.notif-card)");

    const style = document.createElement("style");
    style.innerHTML = `
      .send-like-button {
        background-color: #1ed760;
        border-radius: 100px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        height: 12px;
        width: 12px;
        color: #000;
        margin-right: 4px;
        cursor: pointer;
      }
      
      .mthrc5U9wb8F4zMBqlPy {
        align-items: center;
      }
      
    `;

    feed.append(style);

    for (let card of cards) {
      const likeButton = document.createElement("div");

      likeButton.innerHTML = `
      <p class="Type__TypeElement-goli3j-0 loEuIb LywlKLgNaEtHZzLM3EX5 send-like-button">
        <svg role="img" height="8" width="8" aria-label="now" viewBox="0 -1 16 16" class="Svg-sc-1bi12j5-0 jgfuCe">
          ${SVGIcons["heart-active"]}
        </svg>
      </p>
      `;

      card.querySelector(".mthrc5U9wb8F4zMBqlPy").prepend(likeButton);

      likeButton.addEventListener("click", () => {
        const { track, user } = getTrackAndUser(card);
        doPost({
          send_to_user_id: user.userId,
          track_name: track.track_name,
          artist_name: track.artist_name,
          track_uri: track.track_uri,
          artist_uri: track.artist_uri,
        });
      });
    }
  }

  function getTrackAndUser(card) {
    const user = card.querySelector(".ktMuChpoidaEvECE7y8f a");
    const userDisplayName = user.innerHTML;
    const userId = user.getAttribute("href").split("/user/")[1];

    const [track, artist] = card.querySelectorAll(".mthrc5U9wb8F4zMBqlPy a");
    const track_name = track.getAttribute("title");
    const track_uri = track.getAttribute("href");
    const artist_name = artist.getAttribute("title");
    const artist_uri = artist.getAttribute("href");

    return {
      track: { track_name, track_uri, artist_name, artist_uri },
      user: { userId: userId, displayName: userDisplayName },
    };
  }

  function makeLikeNotification(friendlike) {
    const list = document.querySelector('[aria-label="Friend Activity"] ol');
    const feed = document.querySelector('[aria-label="Friend Activity"]');

    if (!feed) {
      setTimeout(() => makeLikeNotification(friendlike), 100);
      return;
    }

    const style = document.createElement("style");
    style.innerHTML = `
      .notif-card {
        background-color: rgba(29,185,84,.2);
        border-radius: 10px;
        margin-top: 4px;
      }
      
      .like-icon {
        background-color: #1ed760;
        border-radius: 100px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
      }
      
      .close-button {
        cursor: pointer;
      }
    `;

    function handleCloseButtonClick(id) {
      document.querySelector(`#${id}`).remove();
    }

    const notificationLi = document.createElement("li");

    const heartIcon = `
    <figure class="like-icon" style="width: 40px; height: 40px;">
       <svg role="img" viewBox="-8 -8 32 32">
        ${SVGIcons["heart-active"]}
      </svg>
    </figure>
    `;

    const makePersonNameLine = () => `
      <p
          class="Type__TypeElement-goli3j-0 eHCcSU ktMuChpoidaEvECE7y8f ellipsis-one-line">
          Like from:&nbsp;
          <a draggable="false" title="${friendlike.liked_by_user_id}" dir="auto" href="/user/${friendlike.liked_by_user_id}">
            ${friendlike.liked_by_user_name}
          </a>
      </p>
    `;

    notificationLi.innerHTML = `
<div class="gj9SOnCIzruGWAM5m3XO notif-card">
  <div class="dLg5WMgjh1kfYtZ_MnZz">
      ${heartIcon}
  </div>
  <div class="_Xe25F2aC59Kljgqyw3G">
    <div class="P7j2kCLc27vLybuzy5XB">
    ${makePersonNameLine()}
      <p class="Type__TypeElement-goli3j-0 loEuIb LywlKLgNaEtHZzLM3EX5 close-button">
        <svg role="img" height="16" width="16" aria-label="now" viewBox="0 0 16 16" class="Svg-sc-1bi12j5-0 jgfuCe">
          ${SVGIcons["x"]}
        </svg>
      </p>
    </div>
    <p class="Type__TypeElement-goli3j-0 loEuIb mthrc5U9wb8F4zMBqlPy">
      <a 
        draggable="true" 
        title=${friendlike.track_name}
        class="ellipsis-one-line" 
        dir="auto" 
        href=${friendlike.track_uri}
      >
        ${friendlike.track_name}
      </a>
      <span aria-hidden="true">&nbsp;•&nbsp;</span>
      <a 
        draggable="true" 
        title=${friendlike.artist_name}
        class="ellipsis-one-line" 
        dir="auto"
        href=${friendlike.artist_uri}
      >
        ${friendlike.artist_name}
      </a>
    </p>
  </div>
</div>
`;

    feed.append(style);
    list.prepend(notificationLi);

    const id = `notif-card-${(Math.random() * 100000000).toFixed(0)}`;
    notificationLi.id = id;

    const closeButton = document.querySelector(".close-button");
    closeButton.addEventListener("click", () => handleCloseButtonClick(id));
  }
})();
