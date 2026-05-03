# coding: utf-8

from __future__ import absolute_import
import unittest

from flask import json
from six import BytesIO

from openapi_server.models.boot import Boot  # noqa: E501
from openapi_server.test import BaseTestCase


class TestBootController(BaseTestCase):
    """BootController integration test stubs"""

    def test_get_boot(self):
        """Test case for get_boot

        Boot status
        """
        headers = { 
            'Accept': 'application/json',
        }
        response = self.client.open(
            '/v2/boot',
            method='GET',
            headers=headers)
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_put_boot(self):
        """Test case for put_boot

        boot status
        """
        query_string = [('value', 'value_example')]
        headers = { 
            'Accept': 'application/json',
        }
        response = self.client.open(
            '/v2/boot',
            method='PUT',
            headers=headers,
            query_string=query_string)
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))


if __name__ == '__main__':
    unittest.main()
