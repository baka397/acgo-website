import {isClient} from './tool';
import {ipcRenderer} from 'electron';
import {store} from '../store';
import {getClientCacheSuccess,clearClientCacheSuccess,getClientCacheDirSuccess,updateClientDownloadProgress,getClientConfigSuccess} from '../actions/client';

export function windowClose(sub){
    if(!isClient()) return;
    ipcRenderer.send('window','close',sub);
}
export function windowMin(sub){
    if(!isClient()) return;
    ipcRenderer.send('window','min',sub);
}
export function windowMax(sub){
    if(!isClient()) return;
    ipcRenderer.send('window','max',sub);
}
export function windowChange(type,height){
    if(!isClient()) return;
    switch(type){
    case 'dashboard':
        ipcRenderer.send('window','dashboard');
        break;
    case 'common':
        ipcRenderer.send('window','change',400,height);
        break;
    }
}
export function windowOpen(url){
    ipcRenderer.send('window','open',url);
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

export function getCacheDir(){
    if(!isClient()) return;
    ipcRenderer.send('app','getCacheDir');
}

export function getConfig(){
    if(!isClient()) return;
    ipcRenderer.send('app','getConfig');
}

export function updateConfig(data){
    if(!isClient()) return;
    ipcRenderer.send('app','updateConfig',JSON.stringify(data));
}

function app(e,type){
    let args = Array.prototype.slice.call(arguments, 2);
    switch(type){
    case 'getCacheDir':
        store.dispatch(getClientCacheDirSuccess(args[0]));
        break;
    case 'getConfig':
        store.dispatch(getClientConfigSuccess(JSON.parse(args[0])));
        break;
    case 'updateConfig':
        store.dispatch(getClientConfigSuccess(JSON.parse(args[0])));
        break;
    }
}

export function updateAdblockRule(){
    if(!isClient()) return;
    ipcRenderer.send('download','adblock');
}

export function updateClientVersion(versionLimit){
    if(!isClient()) return;
    ipcRenderer.send('download','version',versionLimit);
}

export function startClientDownload(){
    if(!isClient()) return;
    ipcRenderer.send('download','start');
}

function download(e,type){
    let args = Array.prototype.slice.call(arguments, 2);
    switch(type){
    case 'progress':
        store.dispatch(updateClientDownloadProgress(args[0]));
        break;
    case 'error':
        store.dispatch(updateClientDownloadProgress(-1));
        break;
    case 'success':
        store.dispatch(updateClientDownloadProgress(100));
        break;
    }
}

//监控数据内容
if(isClient()){
    ipcRenderer.on('session',session);
    ipcRenderer.on('app',app);
    ipcRenderer.on('download',download);
}