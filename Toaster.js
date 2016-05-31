'use strict';

class Toaster {
    constructor() {
        this._nodeContainer = null;
        this._toasts = [];
        this._onToastHidden = this._onToastHidden.bind(this);
    }

    _initContainer() {
        if (!this._nodeContainer) {
            this._nodeContainer = document.createElement('DIV');
            this._nodeContainer.classList.add('toasts');
            document.body.appendChild(this._nodeContainer);
        }
    }

    createAlert(message, alertType) {
        this._initContainer();

        let toast = new Toast(message, alertType);
        toast.onHidden = this._onToastHidden;

        if (!this._nodeContainer.firstChild) {
            this._nodeContainer.appendChild(toast.getNode());
        }
        else {
            this._nodeContainer.insertBefore(toast.getNode(), this._nodeContainer.firstChild);
        }

        this._toasts.push(toast);

        return toast;
    }

    remove(toast) {
        if (toast) {
            this._nodeContainer.removeChild(toast.getNode());

            if (this._toasts.indexOf(toast) !== -1) {
                this._toasts.splice(this._toasts.indexOf(toast), 1);
            }
        }
    }

    removeAll() {
        let idx = 0;
        while (idx < this._toasts.length) {
            this._nodeContainer.removeChild(toast.getNode());
            idx++;
        }

        this._toasts = [];
    }

    _onToastHidden(toast) {
        this.remove(toast);
    }
}

class Toast {
    constructor(message, alertType) {
        this.hiding = false;
        this._hideTimerId = -1;
        this._alertType = alertType;
        this.delay = 3000; // 3 seconds
        this.onHidden = null; // should be a function

        let alertNode = document.createElement('DIV');
        alertNode.classList.add('toast');
        alertNode.classList.add('alert');
        alertNode.classList.add(alertType);

        let p = document.createElement('P');
        p.innerHTML = `${message}`;
        alertNode.appendChild(p);

        let a = document.createElement('A');
        a.href = '#';
        a.innerHTML = `<i class="icon-cancel"></i>`;
        a.addEventListener('click', evt => {
            evt.preventDefault();
            this.close();
        });
        alertNode.appendChild(a);

        this._node = document.createElement('DIV');
        this._node.classList.add('toast-wrapper');
        this._node.appendChild(alertNode);

        this._transitionEndEvent = this._findTransitionEvent();
    }

    close() {
        if (this.hiding) {
            return;
        }

        if (this._hideTimerId !== -1) {
            clearTimeout(this._hideTimerId);
            this._hideTimerId = -1;
        }

        this.hide();
    }

    hideAfterDelay(delay) {
        this._hideTimerId = setTimeout(_ => {
            this.hide();
        }, (delay ? delay : this.delay));
    }

    hide() {
        this.hiding = true;
        this._node.classList.add('hide');
        this._onTransitionEnd = this._onTransitionEnd.bind(this);
        this._node.addEventListener(this._transitionEndEvent, this._onTransitionEnd);
    }

    getAlertType() {
        return this._alertType;
    }

    getNode() {
        return this._node;
    }

    _findTransitionEvent() {
        if (this._node) {
            let t;
            const transitions = {
                'transition': 'transitionend',
                'OTransition': 'oTransitionEnd',
                'MozTransition': 'transitionend',
                'WebkitTransition': 'webkitTransitionEnd'
            }

            for (t in transitions) {
                if (this._node.style[t] !== undefined) {
                    return transitions[t];
                }
            }
        }

        return null;
    }

    _onTransitionEnd(evt) {
        if (evt.propertyName === 'opacity') {
            this._node.removeEventListener(this._transitionEndEvent, this._onTransitionEnd);
            if (typeof this.onHidden === 'function') {
                this.onHidden(this);
            }
        }
    }
}

Toaster.AlertTypes = {
    SUCCESS: 'alert-success',
    INFO: 'alert-info',
    WARNING: 'alert-warning',
    DANGER: 'alert-danger'
};

window.__Toaster = Toaster;
export default Toaster;
