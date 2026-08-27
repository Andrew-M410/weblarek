import { ensureElement } from "@/utils/utils";
import { IEvents } from "@/components/base/Events";
import { Component } from "@/components/base/Component";

export interface IForm {
  valid: boolean;
  error: string;
}

export abstract class FormView<T extends IForm> extends Component<T> {
  protected submitButton: HTMLButtonElement;
  protected errorELement: HTMLElement;
  protected formElement: HTMLFormElement;

  constructor(container: HTMLFormElement, protected events: IEvents) {
    super(container);

    this.formElement = container;
    this.submitButton = ensureElement<HTMLButtonElement>(
      'button[type="submit"]',
      this.container,
    );
    this.errorELement = ensureElement<HTMLElement>(
      ".form__errors",
      this.container,
    );

    this.submitButton.addEventListener("click", (e) => {
      e.preventDefault();

      this.events.emit(`${(this.container as HTMLFormElement).name}:submit`);
    });

    this.formElement.addEventListener("input", (evt) => {
      const target = evt?.target as HTMLInputElement;

      this.events.emit(`${(this.container as HTMLFormElement).name}:change`, {
        field: target.name,
        value: target.value,
      });
    });
  }

  set valid(value: boolean) {
    this.submitButton.disabled = !value;
  }

  set error(value: string) {
    this.errorELement.textContent = value;
  }
}