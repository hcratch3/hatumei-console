const { SkyWayContext, SkyWayRoom, SkyWayStreamFactory, SkyWayAuthToken, uuidV4, nowInSec } = skyway_room;

const token = new SkyWayAuthToken({
  jti: uuidV4(),
  iat: nowInSec(),
  exp: nowInSec() + 60 * 60 * 24,
  scope: {
    app: {
      id: 'ApplicationID',
      turn: true,
      actions: ['read'],
      channels: [
        {
          id: '*',
          name: '*',
          actions: ['write'],
          members: [
            {
              id: '*',
              name: '*',
              actions: ['write'],
              publication: {
                actions: ['write'],
              },
              subscription: {
                actions: ['write'],
              },
            },
          ],
          sfuBots: [
            {
              actions: ['write'],
              forwardings: [
                {
                  actions: ['write'],
                },
              ],
            },
          ],
        },
      ],
    },
  },
}).encode('SecretKEY');

//console.log(token);

const init = async () => {
    const localVideo = document.getElementById('local-video');

    const { audio, video } = await SkyWayStreamFactory.createMicrophoneAudioAndCameraStream();
    video.attach(localVideo);
    await localVideo.play();
  
    const roomIdInput = document.getElementById('room-id');
    const userIdDisplay = document.getElementById('user-id');

    document.getElementById("stream").onclick = async () => {
        if (roomIdInput.value === '') {
            alert('ルームIDを入力してください');
            return;
        }

        const context = await SkyWayContext.Create(token);
    }
}

document.getElementById("stream").onclick = async () => {
    if (roomIdInput.value === '') {
        alert('ルームIDを入力してください');
        return;
    }

    const context = await SkyWayContext.Create(token);

    const room = await SkyWayRoom.FindOrCreate(context, {
        type: "sfu",
        name: roomIdInput.value,
    });
    const me = await room.join();
    userIdDisplay.innerText = me.id;
}

