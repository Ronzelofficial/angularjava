 (function() {
     function SongPlayer($rootScope, Fixtures) {
          var SongPlayer = {};
         
         var currentAlbum = Fixtures.getAlbum();
         
      
/**
 * @desc Buzz object audio file
 * @type {Object}
 */
     var currentBuzzObject = null;
 /**
 * @function setSong
 * @desc Stops currently playing song and loads new audio file as currentBuzzObject
 * @param {Object} song
 */
         
 var setSong = function(song) {
    if (currentBuzzObject) {
        currentBuzzObject.stop();
        SongPlayer.currentSong.playing = null;
    }
 
    currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
    });
     
          currentBuzzObject.bind('timeupdate', function() {
         $rootScope.$apply(function() {
             SongPlayer.currentTime = currentBuzzObject.getTime();
         });
     });
 
    SongPlayer.currentSong = song;
 };
         
   var playSong = function(song){
            currentBuzzObject.play();
            song.playing = true;
        }
   
   var stopSong = function (song){
       currentBuzzObject.stop();
       song.playing = null;
   }
         
 var getSongIndex = function(song) {
     return currentAlbum.songs.indexOf(song);
 };
         
SongPlayer.currentSong = null;
    
//         the playsong function plays currentbuzzobject
         
 /**
 * @desc Current playback time (in seconds) of currently playing song
 * @type {Number}
 */
 SongPlayer.currentTime = null;
 SongPlayer.volume = 100;
         
    SongPlayer.play = function(song) {
        song = song || SongPlayer.currentSong;
            if (SongPlayer.currentSong !== song) {
             
                
        setSong(song);         
        playSong(song); 
//        song.playing = true;  
              } else if (SongPlayer.currentSong === song) {
         if (currentBuzzObject.isPaused()) {
             playSong(song);
         }
     } 
        
     };
    SongPlayer.pause = function(song) {
         song = song || SongPlayer.currentSong;
     currentBuzzObject.pause();
     song.playing = false;
 };
         
    SongPlayer.previous = function() {
              
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
        currentSongIndex--;
      if (currentSongIndex < 0) {
        stopSong(SongPlayer.currentSong);
            var song = currentAlbum.songs[currentAlbum.songs.length-1];
//          console.log("length", currentAlbum.songs.length );
            setSong(song);
            playSong(song);
          } else {
         var song = currentAlbum.songs[currentSongIndex];
         setSong(song);
         playSong(song);
     }
 };
    SongPlayer.next = function (){
        var currentSongIndex = getSongIndex(SongPlayer.currentSong);
        currentSongIndex++;
        
        if (currentSongIndex === currentAlbum.songs.length) {
            stopSong(SongPlayer.currentSong);
            var song = currentAlbum.songs[0];
            setSong(song);
            playSong(song);
//            console.log("currentsongindex", currentSongIndex);
        }else{
            var song = currentAlbum.songs[currentSongIndex];
            setSong(song);
            playSong(song);
        }
        };
         
          /**
 * @function setCurrentTime
 * @desc Set current time (in seconds) of currently playing song
 * @param {Number} time
 */
 SongPlayer.setCurrentTime = function(time) {
     if (currentBuzzObject) {
         currentBuzzObject.setTime(time);
     }
 };
    
         
      SongPlayer.setVolume = function (volume) {
			if (currentBuzzObject) {
				currentBuzzObject.setVolume(volume);
			}
			SongPlayer.volume = volume;
		};
         
          return SongPlayer;
     }
 
     angular
         .module('blocJams')
         .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
 })();

