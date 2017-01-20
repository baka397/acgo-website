import {isClient} from './tool';
import {ipcRenderer} from 'electron';

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
export function windowChange(type){
    if(!isClient()) return;
    switch(type){
        case 'dashboard':
            ipcRenderer.send('window','change',1200,800);
            break;
        case 'common':
            ipcRenderer.send('window','change',400,600);
            break;
    }
}