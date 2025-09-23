import 'styled-components';
import { IThemeData } from '../utils/themes';

declare module 'styled-components' {
  export interface DefaultTheme extends Partial<IThemeData> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  }
}