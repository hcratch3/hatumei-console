const { SkyWayContext, SkyWayRoom, SkyWayStreamFactory, SkyWayAuthToken, uuidV4, nowInSec } = skyway_room;

const token = new SkyWayAuthToken({
  jti: uuidV4(),
  iat: nowInSec(),
  exp: nowInSec() + 60 * 60 * 24,
  scope: {
    app: {
      id: '7c04d8ef-ce52-43cf-9304-048bd2920ad7',
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
}).encode('Sv42bWy1u6Xl6LrJpe1FgDfZzjXfj5Fvm0c6H9rSC7k=');

//console.log(token);

const init = async () => {
    const localVideo = document.getElementById('local-video');

    const { audio, video } = await SkyWayStreamFactory.createMicrophoneAudioAndCameraStream();
    video.attach(localVideo);
    await localVideo.play();

    const remoteArea = document.getElementById('remote-area');
  
    const roomIdInput = document.getElementById('room-id');

    document.getElementById("watch").onclick = async () => {
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

      const subscribeAndAttach = async (publication) => {
        if (publication.publisher.id === me.id) return;
        const { stream } = await me.subscribe(publication.id);

        let newMedia;
        switch (stream.track.kind) {
            case 'video':
                if (remote_video) {
                    const oldMedia = document.getElementById('remote-video');
                    oldMedia.parentNode.removeChild(oldMedia);
                }
                newMedia = document.createElement('video');
                newMedia.id = "remote-video";
                newMedia.playsInline = true;
                newMedia.autoplay = true;
                newMedia.controls = true;
                remote_video = true;
                break;
            case 'audio':
                if (remote_audio) {
                    const oldMedia = document.getElementById('remote-audio');
                    oldMedia.parentNode.removeChild(oldMedia);
                }
                newMedia = document.createElement('audio');
                newMedia.id = "remote-audio";
                newMedia.controls = true;
                newMedia.autoplay = true;
                remote_audio = true;
                break;
            default:
                return;
        }
        stream.attach(newMedia);
        remoteArea.appendChild(newMedia);
        }


        room.publications.forEach(subscribeAndAttach);
        room.onStreamPublished.add((e) => subscribeAndAttach(e.publication));    }
}

window.onload = init;
