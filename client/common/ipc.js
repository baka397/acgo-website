import {isClient} from './tool';
import {ipcRenderer} from 'electron';
import {store} from '../store';
import {getClientCacheSuccess,clearClientCacheSuccess} from '../actions/client';

export function windowClose(){
    if(!isClient()) return;
    ipcRenderer.send('window','close');
}
export function windowMin(){
    if(!isClient()) return;
    ipcRenderer.send('window','min');
}
export function windowMax(){
    if(!isClient()) return;
    ipcRenderer.send('window','max');
}
export function windowChange(type,height){
    if(!isClient()) return;
    switch(type){
        case 'dashboard':
            ipcRenderer.send('window','change',1200,800);
            break;
        case 'common':
            let $commonNode=document.getElementsByClassName('app-common')[0];
            ipcRenderer.send('window','change',400,height);
            break;
    }
}

export function getCacheSize(){
    if(!isClient()) return;
    ipcRenderer.send('session','cache');
}

export function clearCacheSize(){
    if(!isClient()) return;
    ipcRenderer.send('session','cacheClear');
}

function session(e,type){
    let args = Array.prototype.slice.call(arguments, 2);
    switch(type){
        case 'cache':
            store.dispatch(getClientCacheSuccess(args[0]));
            break;
        case 'cacheClear':
            store.dispatch(clearClientCacheSuccess());
            break;
    }
}

//监控数据内容
if(isClient()){
    ipcRenderer.on('session',session);
}