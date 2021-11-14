import os


def get_home_page_view() -> str:
    dir_name = os.path.dirname(__file__)
    with open(os.path.join(dir_name, 'view.html')) as html:
        template = html.read()

    return template
