export function MaskedDate(event: any) {
    const v = event.target.value;
    if (v.match(/^\d{2}$/) !== null) {
        event.target.value = v + '/';
    } else if (v.match(/^\d{2}\/\d{2}$/) !== null) {
        event.target.value = v + '/';
    } 
}
