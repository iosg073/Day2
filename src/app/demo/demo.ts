@Injectable()
export class ValueService {
  protected value = 'real value';

  getValue() {
    return this.value;
  }
  setValue(value: string) {
    this.value = value;
  }
}