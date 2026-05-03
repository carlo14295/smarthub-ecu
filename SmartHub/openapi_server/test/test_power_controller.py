# coding: utf-8

from __future__ import absolute_import
import unittest

from flask import json
from six import BytesIO

from openapi_server.models.power import Power  # noqa: E501
from openapi_server.test import BaseTestCase


class TestPowerController(BaseTestCase):
    """PowerController integration test stubs"""

    def test_get_power(self):
        """Test case for get_power

        Power status
        """
        headers = { 
            'Accept': 'application/json',
        }
        response = self.client.open(
            '/v2/power',
            method='GET',
            headers=headers)
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_put_power(self):
        """Test case for put_power

        power status
        """
        query_string = [('value', 'value_example')]
        headers = { 
            'Accept': 'application/json',
        }
        response = self.client.open(
            '/v2/power',
            method='PUT',
            headers=headers,
            query_string=query_string)
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))


if __name__ == '__main__':
    unittest.main()
