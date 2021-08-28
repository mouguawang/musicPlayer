var app=new Vue({
  el:'#app',
  data:{
    title:'鱼',
    author:'李铭辰',
    src: "http://music.163.com/song/media/outer/url?id=1436575829.mp3",
    isPlaying: false,
    rotateDeg:0,      /*封面旋转角度*/
    clockNum:0 ,     /*定时器id*/
    audioInfo:{     /*播放器信息*/
      duration:0,
      currentTime:0
    },
    isVisible:false,     /*是否显示评论列表*/
    comments:[
      {
        name:"电气鼠",
        comment:"“如果能被陌生人看到，音乐占了七成功劳” ——冯政",
        createdAt:"2021/7/20"
      }
    ],
    inputtedComment:'',
  },
  computed:{
    progress(){     //计算属性  进度条
      var duration=this.audioInfo.duration;
      var currentTime=this.audioInfo.currentTime;
      return (currentTime/duration)*100
    }
  },
  methods:{
    playMusic(){
      var player=document.getElementById("player");
      player.play();
      this.isPlaying=true;
      this.startRotate();
    },
    pauseMusic(){
      var player=document.getElementById("player");
      player.pause();
      this.isPlaying=false;
      this.pauseRotate();
    },
    startRotate(){
      var rotateTime=5;
      var rotateAngle=0.02;
      var that=this; 
      var clockNum=setInterval(function(){
        that.rotateDeg+=rotateAngle;
      },rotateTime);
      this.clockNum=clockNum;
    },
    pauseRotate(){
      clearInterval(this.clockNum);
    },
    handleCanPlay(event){     //监听音频播放时的事件
      this.audioInfo.duration=event.target.duration;
    },
    handleTimeUpdate(event){      //监听音频播放进度改变的事件
      this.audioInfo.currentTime=event.target.currentTime;
    },
    transferSecToTime(time){
      var tempTime=Math.floor(time);
      var min=0;
      var sec=0;
      if(tempTime>60){
        min=Math.floor(tempTime/60);
        sec=tempTime%60;
      }
      else{
        sec=tempTime;
      }
      if(min<10){
        min='0'+min;
      }
      if(sec<10){
        sec='0'+sec;
      }
      return min+':'+sec;
    },
    addComment(){
      var createdAt=new Date().toLocaleDateString();
      var name="电气鼠";
      this.comments.push({
        name:name,
        comment:this.inputtedComment,
        createdAt:createdAt
      })
      this.inputtedComment='';
    },
  }
})