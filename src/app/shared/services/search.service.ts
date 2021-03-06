import { FirebaseRef, AngularFire } from 'angularfire2';
import { Subject } from 'rxjs/Rx';
import { Injectable, Inject } from '@angular/core';

@Injectable()
export class SearchService {
    private sdkDb: any;

    constructor(@Inject(FirebaseRef) fb, private af: AngularFire) {
        this.sdkDb = fb.database().ref();
    }

    doSearch(query) {
        const subject = new Subject();

        let ref = this.sdkDb.child("search");
        let key = ref.child("request").push(query).key;
        
        ref.child(`response/${key}`).on("value", value => {
            if(value.exists()) {
                subject.next(value.val().hits);
                subject.complete();
                value.ref.remove();
            }
        });

        return subject.asObservable();
    }
}