const ref = {
    button: document.getElementById('auth'),
    toasts: document.getElementById('toasts'),
};

ref.button.addEventListener('click', async () => {
    const response = await fetch('/auth/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: 'igor.c.m@ukr.net',
            token: 'sfvfdr23dGVCHJdce-sverCBCHJbrvce-erver-KbiunILS3f',
            first_name: 'Ihor',
            last_name: 'Mykhailychenko',
            user_agent: 'str',
        }),
    });

    if (response.status > 299) {
        ref.toasts.innerHTML = `
            <div class="alert alert-danger" role="alert">
                Something went wrong. Sent auth email error!
            </div>`;
    }
});
