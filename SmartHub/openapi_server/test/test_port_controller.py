# coding: utf-8

from __future__ import absolute_import
import unittest

from flask import json
from six import BytesIO

from openapi_server.models.port import Port  # noqa: E501
from openapi_server.test import BaseTestCase


class TestPortController(BaseTestCase):
    """PortController integration test stubs"""

    def test_get_all_port(self):
        """Test case for get_all_port

        Find all PORT
        """
        headers = { 
            'Accept': 'application/json',
        }
        response = self.client.open(
            '/v2/port',
            method='GET',
            headers=headers)
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))


if __name__ == '__main__':
    unittest.main()
