//Link List data structure [previous data],-  [current data] -> [next data]

class QueueList {
    previous = null; // previous data
    next = null;  // next data
    song_data = null // song data
    constructor(previous, data) {
        this.previous = previous
        this.song_data = data
    }
    setNextQueue(data){
        if(!this.next){
            this.next = new QueueList(this, data)
            return
        }
        this.next.setNextQueue(data)
    }
}

module.exports =  {
    QueueList
}