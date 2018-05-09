export class CookieService {

	private static _instance: CookieService;
	static get instance() {
		return CookieService._instance || (CookieService._instance = new CookieService());
	}

    static expireDays = 365;

    public set(label: string, value: string, expireDays?: number) {

        if (value == undefined || value == null) {
            value = '';
            expireDays = -1;
        }

        let expire = expireDays === 0 ? 0 : CookieService.expireDays;
        
        let d: Date = new Date();
        d.setTime(d.getTime() + (expire * 86400000));
        let e = d.toUTCString();
        document.cookie = `${label}=${value};expires=${e};path=/`;
    }

    public get(label: string): any {
        let cookies = document.cookie.split(';');
        for (let i = 0, ii = cookies.length; i < ii; ++i) {
            let hashed = ('' + cookies[i]).replace(/^\s\+/g, '').trim();
            if (hashed.indexOf(label) === 0) {
                return hashed.substr(label.length + 1).trim();
            }
        }
        return undefined;
    }

    public delete(label: string) {
        return this.set(label, '', -1);
    }

}