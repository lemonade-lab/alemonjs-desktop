interface TxtMessage {
  t: 'txt'
  d: string
}

interface ImageURLMessage {
  t: 'img'
  d: {
    t: 'url'
    v: string
  }
}

interface ImageBase64Message {
  t: 'img'
  d: {
    t: 'base64'
    v: string
  }
}

interface ImageBufferMessage {
  t: 'img'
  d: {
    t: 'buffer'
    v: string
  }
}

type Message = TxtMessage | ImageURLMessage | ImageBase64Message | ImageBufferMessage

interface EventSend {
  t: 'message:create'
  d: {
    msg: Message[]
  }
}
