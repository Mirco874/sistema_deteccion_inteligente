import { CamerasState } from '..';

type CamerasAction=
| { type: '[Cameras] - load connected cameras', payload: string[]}
| { type: '[Cameras] - connect camera', payload: string }
| { type: '[Cameras] - disconnect camera', payload: string }

export const CamerasReducer = ( state: CamerasState , action: CamerasAction ): CamerasState => {

     switch ( action.type ) {

        case '[Cameras] - load connected cameras':
            return { ...state, cameras: action.payload }

        case "[Cameras] - connect camera":
            state.cameras.push(action.payload);
            return { ...state };

        case "[Cameras] - disconnect camera":
            const newCamerasState = state.cameras.filter((cameraId: String)=> cameraId != action.payload)
            return { ...state, cameras: newCamerasState };

          default:
               return state;
     }

}