import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "numberPadding",
  standalone: true,
})
export class NumberPaddingPipe implements PipeTransform {
  transform(value: number, length: number = 4): string {
    return value.toString().padStart(length, "0");
  }
}
