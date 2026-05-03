import connexion
import six
import os

from openapi_server.models.port import Port  # noqa: E501
from openapi_server import util


def get_all_port():  # noqa: E501
    """Find all PORT

    Returns all single port # noqa: E501


    :rtype: Port
    """

    exec=os.popen("ls /dev/tty*")
    ports = exec.read()	
    print(ports)	
    return ports
